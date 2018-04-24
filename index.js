#!/usr/bin/env node

const commandLineArgs = require('command-line-args');
const jimp = require('jimp');

const optionDefinitions = [
    { name: 'input', alias: 'i', type: String, multiple: true, defaultOption: true },
    { name: 'sizes', type: String, multiple: true },
    { name: 'outname', alias: 'o', type: String }
];

const options = commandLineArgs(optionDefinitions);

if (!options.input || !options.outname) {
    console.log("ires - commandline tool");
    console.log("  Parameters:");
    console.log("    --input [files...]");
    console.log("    --sizes [filesizes...]");
    console.log("    --outname outputname");
    console.log("");
    console.log("  Example:");
    console.log("    ires --input a.png b.png --sizes 16 32 64x48 --outname {filename}-{width}x{height}")
} else {
    for (let i = 0; i < options.input.length; i ++) {
        const input = options.input[i];
        console.log(input);

        for (let j = 0; j < options.sizes.length; j++) {
            let size = options.sizes[j];

            let w, h;
            if (size.indexOf('x') > 0) {
                w = parseInt(size.split('x')[0]);
                h = parseInt(size.split('x')[1]);
            } else {
                w = h = parseInt(size);
            }

            jimp.read(input, function (err, image) {
                if (err) {
                    console.log("Error: ", err);
                    return;
                }

                const inputSplit = input.split('.');
                const filename = inputSplit.slice(0, inputSplit.length - 1).join('.');
                const fileextension = inputSplit[inputSplit.length - 1];

                if (!options.outname) {
                    if (size.indexOf('x') > 0) {
                        options.outname = '{filename}_{width}_{height}.{extension}';
                    } else {
                        options.outname = '{filename}_{width}.{extension}'
                    }
                }

                let outName = options.outname
                    .replace(/\{filename\}/g, filename)
                    .replace(/\{extension\}/g, fileextension)
                    .replace(/\{width\}/g, w)
                    .replace(/\{height\}/g, h)
                    .replace(/\{fileindex\}/g, i)
                    .replace(/\{sizeindex\}/g, j);

                if (outName.indexOf('.') < 0) {
                    outName = outName + '.' + fileextension;
                }

                image.resize(w, h).write(outName);
                console.log('Dupping ' + input + ' to ' + outName);
            });
        }
    }
}