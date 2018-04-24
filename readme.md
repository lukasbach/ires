# IRES

*ires* (Image resizer) is a commandline tool, which can be used to resize arbitrary 
quantities of images into arbitrary quantities of target image sizes.

## Installing and running

 [node.js](https://nodejs.org/en/download/) and npm are required for the tool to run.

To install globally , run

    npm install -g ires
    
Then, use the commandline tool *ires* to process arbitrary quantities 
of images into differently sized image files.

    ires -i input.png --sizes 16 32 64

Will create the files

    input_16.png
    input_32.png
    input_64.png
    
With the respective sizes. 

## Arguments

 * *-i*, *--input* **filenames...**
   
   will use the given paths to files as input files, which will be processed. 
   The image files are separated by spaces.
   
   Example: *--input file1.png file2.png file3.png*
   
 * *--sizes* **sizes...**

   will use the given image sizes as output image sizes. The sizes are separated
   by spaces and are either an integer, describing both width and height for a square
   image, or have the format *wxh*, where *w* is the width in pixels and *h* is the 
   height in pixels.
   
   Example: *--sizes 16 32 48x64*
   
 * *-o*, *--outname* **outname**
 
   is the name of the output files. Several placeholders can be used to differentiate
   the files:
   
   * *{filename}*: The original filename, without the extension.
   * *{extension}*: The original fileextension.
   * *{width}*: The width of the currently processed size.
   * *{height}*: The height of the currently processed size.
   * *{fileindex}*: The index of the file currently processed. For example, if files
       a.png, b.png, c.png, d.png have been entered as input files and currently file c.png
       is being processed, this placeholder will have the value 2.
   * *{sizeindex}*: The index of the size currently processed. For exmaple, if sizes
       16, 32, 64 have been entered as output sizes, and the current file is being resized
       to size 16x16, this placeholder will have the value 0.
       
   Examples:
   
        ires -i a.png b.png --sizes 10x15 20x25 -o {filename}-{extension}.{fileindex}.{sizeindex}-{width}x{height}
        
   Will render the files:
    
        a-png.0.0-10x15.png
        a-png.0.1-20x25.png
        b-png.1.0-10x15.png
        b-png.1.1-20x25.png
   
