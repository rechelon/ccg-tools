from PIL import Image 
import os 


page_list = os.listdir('normal-borders')


for f in page_list:
    name = f[:-4]

    img = Image.open("normal-borders/" + f) 

    # if starting = 865, 1209
    # then crop to 784, 1131
    # cropped and scaled = 894, 1290
    img = img.resize((865,1209))

    left1 = 43
    top1 = 41
    right1 = 823
    bottom1 = 1168 

    cropped = img.crop((left1, top1, right1, bottom1)) 
    resized = cropped.resize((894, 1290))
    resized.save('stripped/' + name +'-11.png')



