import numpy as np
from PIL import Image

W, H = 512, 512
y, x = np.mgrid[-1:1:512j, -1:1:512j]

R_planet = 0.38
R_ring_inner = 0.48
R_ring_outer = 0.92

alpha = np.radians(24.0)   # tilt toward viewer
gamma = np.radians(-16.0)  # rotation in plane

ny = np.cos(alpha) * np.cos(gamma)
nx = -np.cos(alpha) * np.sin(gamma)
nz = np.sin(alpha)
N_ring = np.array([nx, ny, nz])
N_ring = N_ring / np.linalg.norm(N_ring)

sun_angle = np.radians(-130.0)
phase_beta = np.radians(50.0) # phase
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

denom_sun = np.dot(S, N_ring)
t_ring_shadow = np.where(hit_sphere, - (x * N_ring[0] + y * N_ring[1] + z_sphere * N_ring[2]) / denom_sun, -1.0)
P_shadow_x = x + t_ring_shadow * S[0]
P_shadow_y = y + t_ring_shadow * S[1]
P_shadow_z = z_sphere + t_ring_shadow * S[2]
dist_shadow_ring = np.sqrt(P_shadow_x**2 + P_shadow_y**2 + P_shadow_z**2)
is_ring_shadow = (t_ring_shadow > 0.001) & (dist_shadow_ring >= R_ring_inner) & (dist_shadow_ring <= R_ring_outer)

z_ring = - (x * N_ring[0] + y * N_ring[1]) / N_ring[2]
dist_ring = np.sqrt(x**2 + y**2 + z_ring**2)
hit_ring = (dist_ring >= R_ring_inner) & (dist_ring <= R_ring_outer)

dot_Q_S = x * S[0] + y * S[1] + z_ring * S[2]
s_closest = - dot_Q_S
P_close_x = x + s_closest * S[0]
P_close_y = y + s_closest * S[1]
P_close_z = z_ring + s_closest * S[2]
dist_planet_shadow = np.sqrt(P_close_x**2 + P_close_y**2 + P_close_z**2)
is_planet_shadow = (s_closest > 0.001) & (dist_planet_shadow < R_planet)

# Planet lighting:
dot_sphere = N_sphere_x * S[0] + N_sphere_y * S[1] + N_sphere_z * S[2]
t_term = np.clip((dot_sphere - (-0.10)) / (0.22 - (-0.10)), 0.0, 1.0)
terminator = t_term * t_term * (3.0 - 2.0 * t_term)
sphere_lit = np.maximum(0.0, dot_sphere) * terminator
sphere_lit = np.where(is_ring_shadow, sphere_lit * 0.15, sphere_lit)

# Saturn atmospheric cloud bands:
lat = (x * N_ring[0] + y * N_ring[1] + z_sphere * N_ring[2]) / R_planet
band = np.sin(lat * 18.0) * 0.5 + 0.5
# Subtle pastel golden/sand saturn tones:
saturn_base = np.array([245.0, 230.0, 205.0]) / 255.0
saturn_dark = np.array([215.0, 195.0, 165.0]) / 255.0
planet_rgb = saturn_base * (0.85 + 0.15 * band[:, :, None])

# Ring brightness and Cassini division:
# normalized ring coordinate u: 0 at inner, 1 at outer
u_ring = (dist_ring - R_ring_inner) / (R_ring_outer - R_ring_inner)
# Cassini division is between ~ 0.65 and 0.72
cassini = 1.0 - 0.90 * np.exp(-((u_ring - 0.68) / 0.035)**2)
# Ring opacity / texture profile (inner C ring faint, B ring bright, A ring medium)
ring_alpha = np.sin(u_ring * np.pi) * 0.85 + 0.15
ring_alpha = np.where(u_ring < 0.25, ring_alpha * 0.5, ring_alpha) # faint C ring
ring_alpha = ring_alpha * cassini

# Ring lighting:
# Light transmission through rings and scattering:
# Dot product of sun with ring normal:
sun_ring_dot = np.abs(denom_sun)
ring_lit = np.where(is_planet_shadow, 0.08, 0.95 * (0.6 + 0.4 * sun_ring_dot))

# Ring color: delicate translucent golden icy cream
ring_color = np.array([250.0, 238.0, 218.0]) / 255.0

# Composite image with sky background #749bd0
sky_color = np.array([116.0, 155.0, 208.0]) / 255.0
img = np.zeros((H, W, 4), dtype=np.float32)

# Antialiasing limb for sphere:
sphere_limb = np.clip((1.0 - np.sqrt(r2_xy) / R_planet) / 0.01, 0.0, 1.0)
sphere_alpha = sphere_limb * np.clip(sphere_lit * 1.2, 0.0, 1.0) * 0.72

# Ring limb:
ring_edge = np.clip((dist_ring - R_ring_inner) / 0.01, 0.0, 1.0) * np.clip((R_ring_outer - dist_ring) / 0.01, 0.0, 1.0)
final_ring_alpha = ring_edge * hit_ring * ring_alpha * ring_lit * 0.70

# Depth composite:
# Case 1: ring in front of sphere
z_ring_layer = np.where(hit_ring, z_ring, -100.0)
z_sphere_layer = np.where(hit_sphere, z_sphere, -100.0)

# Render back to front:
# Behind: whatever has smaller Z
out_rgb = np.zeros((H, W, 3), dtype=np.float32)
out_a = np.zeros((H, W), dtype=np.float32)

# Where sphere is behind ring:
# If sphere is hit and ring is in front: sphere first, then ring over it
# If ring is behind sphere: ring first, then sphere over it

for yi in range(0, H, 4):
    pass # vectorized below

sphere_behind = hit_sphere & hit_ring & (z_ring_layer > z_sphere_layer)
ring_behind = hit_sphere & hit_ring & (z_sphere_layer >= z_ring_layer)

# Simpler: just calculate top surface and handle transparency
# Back object and Front object:
front_is_ring = (z_ring_layer > z_sphere_layer)

# Layer 1 (Back):
back_rgb = np.where(front_is_ring[:, :, None], planet_rgb, ring_color)
back_a = np.where(front_is_ring, np.where(hit_sphere, sphere_alpha, 0.0), np.where(hit_ring, final_ring_alpha, 0.0))

# Layer 2 (Front):
front_rgb = np.where(front_is_ring[:, :, None], ring_color, planet_rgb)
front_a = np.where(front_is_ring, np.where(hit_ring, final_ring_alpha, 0.0), np.where(hit_sphere, sphere_alpha, 0.0))

# Standard Porter-Duff Over: front over back
c_front = front_rgb * front_a[:, :, None]
c_back = back_rgb * back_a[:, :, None]
comp_rgb = c_front + c_back * (1.0 - front_a[:, :, None])
comp_a = front_a + back_a * (1.0 - front_a)

comp_rgb = np.where(comp_a[:, :, None] > 0.001, comp_rgb / np.maximum(comp_a[:, :, None], 1e-4), 0.0)

# Save result image
out_rgba = np.zeros((H, W, 4), dtype=np.uint8)
out_rgba[:, :, :3] = np.clip(comp_rgb * 255.0, 0, 255).astype(np.uint8)
out_rgba[:, :, 3] = np.clip(comp_a * 255.0, 0, 255).astype(np.uint8)

Image.fromarray(out_rgba).save("scratch/saturn_test_render.png")

# Composite on sky background:
sky_comp = comp_rgb * comp_a[:, :, None] + sky_color * (1.0 - comp_a[:, :, None])
sky_comp_u8 = np.clip(sky_comp * 255.0, 0, 255).astype(np.uint8)
Image.fromarray(sky_comp_u8).save("scratch/saturn_on_sky.png")
print("Rendered scratch/saturn_on_sky.png")
