from PIL import Image 
import os 


page_list = os.listdir('impropersized')


for f in page_list:
    name = f[:-4]

    img = Image.open("impropersized/" + f) 

    resized = img.resize((894, 1290))
    resized.save('stripped/' + name +'-11.png')



