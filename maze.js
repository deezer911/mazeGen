//constants
const command = "path";
const number = "17";
const fs = require( "fs" );
const path = require("path");
const { resourceLimits } = require("worker_threads");

//Maze constants
const maze_corner_top_left = "┏";
const maze_corner_top_right = "┓";
const maze_corner_bottom_left = "┗";
const maze_corner_bottom_right = "┛";
const maze_corners = [maze_corner_top_left, maze_corner_top_right, maze_corner_bottom_left, maze_corner_bottom_right];
const maze_bar_horizontal = "─";
const maze_bar_vertical = "│";
const maze_T_up = "┻";
const maze_T_down = "┳";
const maze_T_left = "┫";
const maze_T_right = "┣";
const maze_Ts = [maze_T_up, maze_T_down, maze_T_left, maze_T_right];
const maze_cross = "╋";
const maze_blank = "    ";
const maze_everything = [maze_corner_top_left, maze_corner_top_right, maze_corner_bottom_left, maze_corner_bottom_right, maze_bar_horizontal, maze_bar_vertical, maze_T_up, maze_T_down, maze_T_left, maze_T_right, maze_cross];
const maze_return = `\n`;

//Maze variables
var maze_dimensions = 2;

//functions
function makeArray(horizontal, vertical)
{
    var arr = [];
    for( let iH = 0; iH < horizontal; iH++ )
    {
        arr[iH] = [];
        for( let iV = 0; iV < vertical; iV++ )
        {
            arr[iH][iV] = 0;
        }
    }
    return arr;
};

function makeMazeArray( horizontal, vertical )
{
    let mazeDimensionsMinusOne = maze_dimensions-1;
    var mArray = [];
    for( let mH = 0; mH < horizontal; mH++ )
    {
        mArray[mH] = [];
        for( let mV = 0; mV < vertical; mV++ )
        {
            //Corners
            if ( mH == 0 && mV == 0 )
            {
                mArray[mH][mV] = maze_corner_top_left+maze_bar_horizontal;
            }
            else if ( mH == 0 && mV == mazeDimensionsMinusOne )
            {
                mArray[mH][mV] = maze_corner_top_right+`\n`;
            }
            else if ( mH == mazeDimensionsMinusOne && mV == 0 )
            {
                mArray[mH][mV] = maze_corner_bottom_left+maze_bar_horizontal;
            }
            else if ( mH == mazeDimensionsMinusOne && mV == mazeDimensionsMinusOne )
            {
                mArray[mH][mV] = maze_corner_bottom_right;
            }

            //T's
            else if ( mH == 0 )
            {
                mArray[mH][mV] = maze_T_down+maze_bar_horizontal;
            }
            else if ( mV == mazeDimensionsMinusOne )
            {
                mArray[mH][mV] = maze_T_left+`\n`;
            }
            else if ( mV == 0 )
            {
                mArray[mH][mV] = maze_T_right+maze_bar_horizontal;
            }
            else if ( mH == mazeDimensionsMinusOne )
            {
                mArray[mH][mV] = maze_T_up+maze_bar_horizontal;
            }

            //Filler, crosses
            else
            {
                mArray[mH][mV] = maze_cross+maze_bar_horizontal;
            };
        };
    };
    
    return mArray;
};
function mazeGenPathing()
{
    //Trace a start to a finish
    let path = [];

    //trace a path from start to finish
    //from 0,0 to some other cell nearby not already visited

    const height = 17;
    const width = 17;
    let maze = makeArray(height, width);
    let visited = makeArray(height, width); //0 is false, anything not 0 is true
    visited[0][0] = 1;

    let pos = newPos(0, 0);

    do
    {
        availablePos = checkAvailablePos( visited, pos, height, width );

        pos = randomFromArray( availablePos );
        
        path.push( pos );

        //if backtrack here
        visited[pos.y][pos.x] = 1;

        console.log( drawMaze( visited ) );
    }
    while( pos.x != 0 || pos.y != 0 )

    //if no availablePos (availablePos.length), backtrack and check again, until reach starting point

    // console.log( maze );
    drawMaze( maze );
};

function random(min, max)
{
    return min + Math.floor(Math.random() * ((max+1) - min));
}

function randomFromArray(theArray)
{
    return theArray[random(0, theArray.length - 1)];
}

function backtrackPos( availablePos )
{
    if ( availablePos.length == 0 )
        path.pop()
};

function checkAvailablePos( visited, pos, height, width )
{
    let availablePos = [];

    if ( pos.y-1 >= 0 && !visited[pos.y-1][pos.x] )
        availablePos.push( newPos( pos.y-1, pos.x ) )

    if ( pos.y+1 < height && !visited[pos.y+1][pos.x] )
        availablePos.push( newPos( pos.y+1, pos.x ) )

    if ( pos.x-1 >= 0 && !visited[pos.y][pos.x-1] )
        availablePos.push( newPos( pos.y, pos.x-1 ) )

    if ( pos.x+1 < width && !visited[pos.y][pos.x+1] )
        availablePos.push( newPos( pos.y, pos.x+1 ) )

    return availablePos;
};

function newPos( y, x )
{
    return {"y":y, "x":x};
};

function drawMaze( mazeToDraw )
{
    const height =  mazeToDraw.length;
    for ( let y = 0; y < height; y++ )
    {
        const width = mazeToDraw[y].length;
        
        let stringPrint = "";
        for ( let x = 0; x < width; x++ )
        {
            stringPrint = stringPrint + mazeToDraw[y][x].toString();
        };
        console.log( stringPrint );
    };
};


function mazeGen( newMazeDimensions )
{
    // maze_dimensions = newMazeDimensions;

    // let arrayMaze = makeMazeArray( maze_dimensions, maze_dimensions );
    // let arrayConnections = makeArray( maze_dimensions, maze_dimensions );
    // let messageMaze = "";
    // let entry_exit = 0;

    // for ( let iHorizontal = 0; iHorizontal < maze_dimensions; iHorizontal++ )
    // {
    //     for ( let iVertical = 0; iVertical < maze_dimensions; iVertical++ )
    //     {
    //         cell = arrayConnections[iHorizontal][iVertical];
    //         if ( cell != 2 )
    //         {



    //             console.log(arrayMaze.toString().replace(/(,)/g, ""));
    //         };
    //     };
    // };

    // messageMaze = arrayMaze.toString();
    // messageMaze = messageMaze.replace(/(,)/g, "");
    // return(`\`\`\` \n${messageMaze} \`\`\``);
    




};


// async function fetchAsync()
// {
//     let response = await fetch( "https://api-free.deepl.com/v2/translate" );
//     let data = await response.json();
//     return data;
// };

if ( command == "path" )
{
    mazeGenPathing();
};

if ( command == "test5" )
{
    TEST5ARRAY = makeMazeArray(4, 4);
    console.log( TEST5ARRAY.toString() );
    console.log( TEST5ARRAY );

    TEST5ARRAY = TEST5ARRAY.toString();
    TEST5ARRAY = TEST5ARRAY.replace(/(,)/g, "");
    console.log( TEST5ARRAY );
};

if ( command == "maze" )
{
    if (!number.length)
    {
        console.log(mazeGen(maze_dimensions));
    }
    else if (number <= 17)
    {
        console.log(mazeGen(number));
    }
    else
    {
        if (number > 17)
        {
            console.log(`Too big! Must be 17 or lower! You sent ${number}!`);
        }
        else
        {
            console.log(`Not good! Must be a number! You sent ${number}!`);
        };
    };
};


console.log(`=======\n=======this is the end!=======\n=======`)
