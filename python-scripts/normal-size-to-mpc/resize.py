from PIL import Image 
import os 
import PIL


input_cards = [f for f in os.listdir('input-cards') if not f.startswith('.')] #os.listdir('input-cards')

for card_filename in input_cards:
    name = card_filename[:-4]
    
    mpc_card = Image.open('input-cards/' + card_filename)

    '''
    width = mpc_card.size[0]
    height = mpc_card.size[1]
    if width != 1495:
        new_width = 1495
        new_height = 2032
        mpc_card = mpc_card.resize((new_width, new_height))
    # Originally I assumed the swccg cards had an even border of 130px but in fact it looks like multiple templates are just a little off, with variation between 130 and 136 sigh.
    # there's also inconsistency on each side for a crop, but less, so i went with the generally safest across all the templates
    '''

    left = 15 
    top = 15
    right = 360
    bottom = 510
    cropped_card = mpc_card.crop((left, top, right, bottom))
    #cropped_card.save('cropped/' + name + '.png')

    resized_card = cropped_card.resize((1229, 1770))

    black_placeholder = Image.open('black.png')
    black_placeholder.paste(resized_card, (136, 136))

    black_placeholder.save('cropped/' + name + '.png')



