# SWCCG MPC -> Home Print

First stick a set of MPC formatted card images in the input folder. (These must be 1495px wide for now.) The script prints them in multiples of 3 on sheets of 9, with the primary intention that you stick 60 card images in the folder.

Then open terminal in this folder with the scripts and run

python3 resize.py

This will create a set of the same cards in the cropped folder with the black borders entirely stripped away. Check these.

Then in terminal you'll want to run

python3 create-sheets.py

And then check the output in cropped!
