from PIL import Image 
import os 
import PIL
import math

import numpy as np

input_cards = os.listdir('cropped')
print(input_cards)

pages = math.ceil( len(input_cards) / 9)
print(pages)

white_placeholder =  Image.open('white.png')


def cardn(n):
    cardn_filename = input_cards[ n ]
    return Image.open('cropped/' + cardn_filename)


for i in range(0, pages):
    print(i)
    base_sheet = Image.open('basesheet.png')

    left1 = 360
    left2 = 1719
    left3 = 3080
    top1 = 235
    top2 = 2135 
    top3 = 4035


    '''
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
    '''

    #base_sheet.paste(card1, (left,top)
    n = i * 9

    base_sheet.paste(cardn(n), (left1,top1))
    base_sheet.paste(cardn(n+1), (left2,top1))
    base_sheet.paste(cardn(n+2), (left3,top1))

    base_sheet.paste(cardn(n+3), (left1,top2))
    base_sheet.paste(cardn(n+4), (left2,top2))
    base_sheet.paste(cardn(n+5), (left3,top2))

    try:
        base_sheet.paste(cardn(n+6), (left1,top3))
        base_sheet.paste(cardn(n+7), (left2,top3))
        base_sheet.paste(cardn(n+8), (left3,top3))
    except:
        base_sheet.paste(white_placeholder, (left1,top3))
        base_sheet.paste(white_placeholder, (left2,top3))
        base_sheet.paste(white_placeholder, (left3,top3))

    base_sheet.save("output/homeprint-"+str(i) + '.png')

