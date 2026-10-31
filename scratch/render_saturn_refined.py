import numpy as np
from PIL import Image

# Higher res 1024x1024 for pristine crispness then scaled to 512x512
W, H = 1024, 1024
y, x = np.mgrid[-1:1:1024j, -1:1:1024j]

R_planet = 0.38
R_ring_inner = 0.49
R_ring_outer = 0.94

# Rings tilt:
alpha = np.radians(25.0)   # tilt toward viewer (showing rings obliquely)
gamma = np.radians(-16.0)  # counter-clockwise rotation in screen plane

ny = np.cos(alpha) * np.cos(gamma)
nx = -np.cos(alpha) * np.sin(gamma)
nz = np.sin(alpha)
N_ring = np.array([nx, ny, nz])
N_ring = N_ring / np.linalg.norm(N_ring)

# Light angle matching dusk banner:
sun_angle = np.radians(-135.0)
phase_beta = np.radians(52.0)
S = np.array([
    np.sin(phase_beta) * np.cos(sun_angle),
    np.sin(phase_beta) * np.sin(sun_angle),
    np.cos(phase_beta)
])
S = S / np.linalg.norm(S)

r2_xy = x**2 + y**2
hit_sphere = r2_xy <= (R_planet**2)
z_sphere = np.where(hit_sphere, np.sqrt(np.maximum(0.0, R_planet**2 - r2_xy)), -100.0)

N_sphere_x = np.where(hit_sphere, x / R_planet, 0.0)
N_sphere_y = np.where(hit_sphere, y / R_planet, 0.0)
N_sphere_z = np.where(hit_sphere, z_sphere / R_planet, 0.0)

# Ring shadow on sphere:
denom_sun = np.dot(S, N_ring)
t_ring_shadow = np.where(hit_sphere, - (x * N_ring[0] + y * N_ring[1] + z_sphere * N_ring[2]) / denom_sun, -1.0)
P_shadow_x = x + t_ring_shadow * S[0]
P_shadow_y = y + t_ring_shadow * S[1]
P_shadow_z = z_sphere + t_ring_shadow * S[2]
dist_shadow_ring = np.sqrt(P_shadow_x**2 + P_shadow_y**2 + P_shadow_z**2)
is_ring_shadow = (t_ring_shadow > 0.001) & (dist_shadow_ring >= R_ring_inner) & (dist_shadow_ring <= R_ring_outer)

# Ring plane intersection:
z_ring = - (x * N_ring[0] + y * N_ring[1]) / N_ring[2]
dist_ring = np.sqrt(x**2 + y**2 + z_ring**2)
hit_ring = (dist_ring >= R_ring_inner) & (dist_ring <= R_ring_outer)

# Planet shadow on ring:
dot_Q_S = x * S[0] + y * S[1] + z_ring * S[2]
s_closest = - dot_Q_S
P_close_x = x + s_closest * S[0]
P_close_y = y + s_closest * S[1]
P_close_z = z_ring + s_closest * S[2]
dist_planet_shadow = np.sqrt(P_close_x**2 + P_close_y**2 + P_close_z**2)
is_planet_shadow = (s_closest > 0.001) & (dist_planet_shadow < R_planet)

# Planet lighting:
dot_sphere = N_sphere_x * S[0] + N_sphere_y * S[1] + N_sphere_z * S[2]
# Soft atmospheric terminator falloff into morning/dusk blue sky
t_term = np.clip((dot_sphere - (-0.12)) / (0.24 - (-0.12)), 0.0, 1.0)
terminator = t_term * t_term * (3.0 - 2.0 * t_term)
sphere_lit = np.maximum(0.0, dot_sphere) * terminator
# Shadow from ring:
sphere_lit = np.where(is_ring_shadow, sphere_lit * 0.12, sphere_lit)

# Saturn cloud belts:
lat = (x * N_ring[0] + y * N_ring[1] + z_sphere * N_ring[2]) / R_planet
band1 = np.sin(lat * 14.0) * 0.5 + 0.5
band2 = np.sin(lat * 32.0 + 1.2) * 0.5 + 0.5
band_mix = 0.7 * band1 + 0.3 * band2

# Natural warm sunlit Saturn color palette:
saturn_bright = np.array([254.0, 246.0, 230.0]) / 255.0
saturn_tan = np.array([238.0, 222.0, 196.0]) / 255.0
planet_rgb = saturn_tan * (0.84 + 0.16 * band_mix[:, :, None])

# Ring texture profile:
u_ring = (dist_ring - R_ring_inner) / (R_ring_outer - R_ring_inner)
# Cassini division:
cassini = 1.0 - 0.94 * np.exp(-((u_ring - 0.69) / 0.032)**2)
# Encke gap:
encke = 1.0 - 0.85 * np.exp(-((u_ring - 0.90) / 0.012)**2)
# Ring density:
# C ring (inner ~0.0 to 0.24) is faint/translucent
# B ring (~0.24 to 0.67) is bright and dense
# A ring (~0.71 to 1.0) is medium density
density = np.where(u_ring < 0.24, 0.35 + 0.3 * np.sin(u_ring * 40.0), 
          np.where(u_ring < 0.68, 0.92 + 0.08 * np.sin(u_ring * 60.0),
                                  0.72 + 0.12 * np.sin(u_ring * 50.0)))
ring_alpha = density * cassini * encke

sun_ring_dot = np.abs(denom_sun)
ring_lit = np.where(is_planet_shadow, 0.06, 0.94 * (0.55 + 0.45 * sun_ring_dot))
ring_color = np.array([252.0, 244.0, 226.0]) / 255.0

# Antialiasing:
sphere_limb = np.clip((1.0 - np.sqrt(r2_xy) / R_planet) / 0.005, 0.0, 1.0)
sphere_alpha = sphere_limb * np.clip(sphere_lit * 1.25, 0.0, 1.0) * 0.75

ring_edge = np.clip((dist_ring - R_ring_inner) / 0.005, 0.0, 1.0) * np.clip((R_ring_outer - dist_ring) / 0.005, 0.0, 1.0)
final_ring_alpha = ring_edge * hit_ring * ring_alpha * ring_lit * 0.72

z_ring_layer = np.where(hit_ring, z_ring, -100.0)
z_sphere_layer = np.where(hit_sphere, z_sphere, -100.0)

front_is_ring = (z_ring_layer > z_sphere_layer)

back_rgb = np.where(front_is_ring[:, :, None], planet_rgb, ring_color)
back_a = np.where(front_is_ring, np.where(hit_sphere, sphere_alpha, 0.0), np.where(hit_ring, final_ring_alpha, 0.0))

front_rgb = np.where(front_is_ring[:, :, None], ring_color, planet_rgb)
front_a = np.where(front_is_ring, np.where(hit_ring, final_ring_alpha, 0.0), np.where(hit_sphere, sphere_alpha, 0.0))

c_front = front_rgb * front_a[:, :, None]
c_back = back_rgb * back_a[:, :, None]
comp_rgb = c_front + c_back * (1.0 - front_a[:, :, None])
comp_a = front_a + back_a * (1.0 - front_a)
comp_rgb = np.where(comp_a[:, :, None] > 0.001, comp_rgb / np.maximum(comp_a[:, :, None], 1e-4), 0.0)

out_rgba = np.zeros((H, W, 4), dtype=np.uint8)
out_rgba[:, :, :3] = np.clip(comp_rgb * 255.0, 0, 255).astype(np.uint8)
out_rgba[:, :, 3] = np.clip(comp_a * 255.0, 0, 255).astype(np.uint8)

im = Image.fromarray(out_rgba).resize((512, 512), Image.Resampling.LANCZOS)
im.save("public/saturn_slate.webp", "WEBP", quality=95)

# Composite on sky background:
sky_color = np.array([116.0, 155.0, 208.0]) / 255.0
sky_comp = comp_rgb * comp_a[:, :, None] + sky_color * (1.0 - comp_a[:, :, None])
sky_comp_u8 = np.clip(sky_comp * 255.0, 0, 255).astype(np.uint8)
sky_im = Image.fromarray(sky_comp_u8).resize((512, 512), Image.Resampling.LANCZOS)
sky_im.save("scratch/saturn_on_sky.png")
sky_im.save("/Users/thinethshehara/.gemini/antigravity/brain/b27d8d10-8eb1-4958-814a-25fefe528654/saturn_on_sky.png")
print("Saved refined public/saturn_slate.webp and scratch/saturn_on_sky.png")
