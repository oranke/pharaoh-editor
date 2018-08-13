const https = require('https');
const fs = require('fs');
const readline = require('readline');

const B_NIL =   0
// 방해용, 관들의 코드..
const B_H21 =   11
// const B_H22 =   12
const B_V21 =   21
// const B_V22 =   22
const B_H31 =   31
// const B_H32 =   32
// const B_H33 =   33
const B_V31 =   41
// const B_V32 =   42
// const B_V33 =   43
// 파라오용 관의 코드..
const B_PH1 =   51
// const B_PH2 =   52


// http://www.cs.yorku.ca/~oz/hash.html 의 sdbm 방식.
function memHash3(buffer, seed=0x00) {
    let uint8View = new Uint8Array(buffer);
    let ret = new Uint32Array(1); 
    ret[0] = seed;
    for (let i=0; i<uint8View.length; i++) {
        ret[0] = uint8View[i] + (ret[0] << 6) + (ret[0] << 16) - ret[0]; 
    }

    return ret[0]; 
}

// https://stackoverflow.com/questions/9909038/formatting-hexadecimal-number-in-javascript
function toPaddedHexString(num, len) {
    str = num.toString(16);
    return "0".repeat(len - str.length) + str;
}

function printPlate(plate) {
    console.log('--------')
    for (let j=0; j<6; j++) {
        for (let i=(j*6); i<(j+1)*6; i++)
            //console.log(i); 
            process.stdout.write(plate[i] + ', ');
        process.stdout.write('\n');
    }
}

function insertBlock(plate, position, blockType, len) {
    let x = position % 6;
    let y = Math.floor(position / 6); 
    //console.log(x + ', ' + y);

    switch (blockType) {
        case B_PH1:
        case B_H21:
        case B_H31:
            for (let i=0; i<len; i++)
                plate[(x+i) + 6 * y] = blockType+i;;
            break;
            
        case B_V21: 
        case B_V31:
            for (let i=0; i<len; i++) 
                plate[x + 6 * (y+i)] = blockType+i;;
            break;

        default:
            return;    
    }
}

function blockStrToBuffer(blockStr) {
    //console.log('----');

    // 문자열을 ','로 쪼개 blocks 배열에 담기. 
    var c = blockStr.split(',');
    var blocks = []; 

    for (i=0; i< c.length; i++) {
        var s = c[i].split('-');
        item = {};
        item.pos = parseInt(s[0]);
        item.dir = parseInt(s[1]);
        item.len = parseInt(s[2]);
        item.type = 0; 

        switch (item.dir) {
            case 0:
                switch (item.len) {
                    case 2: 
                        if (i == 0)
                            item.type = B_PH1;
                        else
                            item.type = B_H21; 
                    break; 
                    case 3: item.type = B_H31; break; 
                }
                break; 

            case 1:
                switch (item.len) {
                    case 2: item.type = B_V21; break; 
                    case 3: item.type = B_V31; break; 
                }
                break; 
        }
        //console.log(item);
        blocks.push(item);
    }

    var buffer = new ArrayBuffer(6 * 6); 
    // 부호 없는 1 byte 정수 배열
    var plate = new Uint8Array(buffer);
    //console.log(plate[0]);

    for (let i=0; i<blocks.length; i++) {
        //console.log(i + ' insert : ' + blocks[i].pos + ', ' + blocks[i].type + ', ' + blocks[i].len)
        insertBlock(plate, blocks[i].pos, blocks[i].type, blocks[i].len);
        //printPlate(plate); 
        //console.log('----')

    }



     /*
    //console.log(blocks.length);
    console.log(blockStr); 
    //console.log(plate); 
    printPlate(plate); 
    console.log(memHash3(buffer)); 
    console.log('0x'+toPaddedHexString(memHash3(buffer), 8)); 
    // */
    return buffer; 

    //console.log(blocks); 
}

/*
function proc_RecvData(data) {
    console.log('Count: ' + data.feed.entry.length)

    for(var i=0; i<data.feed.entry.length; i++) {
    //for(var i=0; i<10; i++) {    
        let blockStr = data.feed.entry[i]["gsx$_cokwr"]["$t"]; 
        //console.log(blockStr);
        let buffer = blockStrToBuffer(blockStr); 
        //console.log(memHash3(buffer)), 
        console.log('0x'+toPaddedHexString(memHash3(buffer), 8)); 

        //blockStrToBuffer(blockStr); 
    }



}

async function main() {
    //console.log(https)
    
    //blockStrToBuffer('12-0-2,1-0-2,21-0-2,3-0-3,23-1-2,10-1-2,30-0-2,0-1-2,19-0-2,26-0-3,11-1-2,7-0-3');
    //return; 

    https.get(
        'https://spreadsheets.google.com/feeds/list/1cawMOn9bv5H9jEfQCXY7IcvR_04F1D82I_gAhaMQeG8/od6/public/values?alt=json',
        async (res) => {
            //console.log('statusCode:', res.statusCode);
            //console.log('headers:', res.headers);
          
            let body = ''; 

            res.on('data', (d) => {
                //process.stdout.write(d);
                body += d; 
            });

            res.on('end', ()=> {
                //console.log(body);
                proc_RecvData(JSON.parse(body)); 
            })
          }
    ).on('error', (e) => {
        console.error(e);
    });

    //console.log(data); 
    //console.log('finish');

}
*/

function main() {
    var rd = readline.createInterface({
        input: fs.createReadStream('./input.txt'),
        output: process.stdout,
        console: false
    });
    
    rd.on('line', function(line) {
        //console.log(line);
        let buffer = blockStrToBuffer(line); 
        //console.log(memHash3(buffer)), 
        console.log('0x'+toPaddedHexString(memHash3(buffer), 8)); 

    });
}


main(); 

