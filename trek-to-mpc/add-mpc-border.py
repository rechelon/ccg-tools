from PIL import Image, ImageOps
import os


image_list = os.listdir('stripped')

for i in image_list:
  img = Image.open('stripped/' + i)
  img_with_border = ImageOps.expand(img,border=100,fill='black')
  img_with_border.save('bordered/b-%s' % i)

