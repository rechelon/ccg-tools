from PIL import Image 
import os 


page_list = os.listdir('page-pngs')


for f in page_list:
    name = f[:-4]

    img = Image.open("page-pngs/" + f) 

    img.save('test.png')

    left1 = 260
    left2 = 1253
    left3 = 2245
    top1 = 170
    top2 = 1556
    top3 = 2942
    right1 = 1155
    right2 = 2147
    right3 = 3138
    bottom1 = 1460 
    bottom2 = 2845
    bottom3 = 4231

    cropped = img.crop((left1, top1, right1, bottom1)) 
    cropped.save('stripped/' + name +'-11.png')

    cropped = img.crop((left2, top1, right2, bottom1)) 
    cropped.save('stripped/' + name +'-12.png')

    cropped = img.crop((left3, top1, right3, bottom1)) 
    cropped.save('stripped/' + name +'-13.png')


    cropped = img.crop((left1, top2, right1, bottom2)) 
    cropped.save('stripped/' + name +'-21.png')

    cropped = img.crop((left2, top2, right2, bottom2)) 
    cropped.save('stripped/' + name +'-22.png')

    cropped = img.crop((left3, top2, right3, bottom2)) 
    cropped.save('stripped/' + name +'-23.png')


    cropped = img.crop((left1, top3, right1, bottom3)) 
    cropped.save('stripped/' + name +'-31.png')

    cropped = img.crop((left2, top3, right2, bottom3)) 
    cropped.save('stripped/' + name +'-32.png')

    cropped = img.crop((left3, top3, right3, bottom3)) 
    cropped.save('stripped/' + name +'-33.png')











