import os
from moviepy.video.VideoClip import TextClip

# Configuración de rutas
video_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'videos')
os.makedirs(video_dir, exist_ok=True)

# Crear clip de texto
clip = TextClip(
    text='Prueba de video con moviepy',
    fontsize=36,
    color='white',
    font='Arial-Unicode-MS'
)

# Crear video
final_clip = clip.set_duration(5).set_size((1920, 1080))

# Guardar el video
output_file = os.path.join(video_dir, 'test_video.mp4')
final_clip.write_videofile(output_file, codec='libx264', audio_codec='aac')
print(f'Video creado en: {output_file}')