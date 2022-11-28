# import module
from pdf2image import convert_from_path
import os
 
# Store Pdf with convert_from_path function
dir_list = os.listdir('pdfs')

for f in dir_list:
    name = f[:-4]
    images = convert_from_path('pdfs/'+f, dpi=400)
    
    for i in range(len(images)):
        # Save pages as images in the pdf
        images[i].save('page-pngs/' + name + '-' + str(i) +'.png', 'PNG')

