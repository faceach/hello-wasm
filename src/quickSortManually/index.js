__ATPOSTRUN__.push(function () {

    // 11, 24, 36, 42, 4, 25, 34, 87, 52, 7, 9, 1, 0
    var elTextArea = document.getElementById("inputArray");

    document.getElementById('btnSort').addEventListener('click', function () {
        // Get user inputs
        var strInputArray = elTextArea.value;
        if (!strInputArray) {
            return;
        }
        strInputArray = strInputArray.replace(/\s+/g, "");
        var array = strInputArray.split(',');

        console.log('Input Array', array);

        var arrayPointer = Module.ccall(
            'quickSort', // name of C function 
            'number', // return type
            ['array', 'number', 'number'], // argument types
            [array, 0, array.length - 1] // arguments
        );

        var clearArrResult = [];
        for (var i = 0; i < array.length; i++) {
            // Get data from shared memory through Emscripten runtime
            clearArrResult.push(Module['getValue'](arrayPointer + i, 'i8'));
        }

        console.log('=================');
        console.log(arrayPointer);
        console.log('Sorted Array', clearArrResult);
    });
});