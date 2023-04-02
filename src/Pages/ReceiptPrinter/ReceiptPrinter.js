import React from "react";

const ReceiptPrinter = () => {

    const handlePrinters = async () => {
        const ports = await navigator.serial.getPorts();
        const port = await navigator.serial.requestPort();
        console.log(ports);
        console.log(navigator.serial);
        console.log(await port);
        await port.open({ baudRate: 9600 });
        const reader = port.readable.getReader();
        console.log(reader);
        const it = await reader.read();
        console.log('value', it.value);
        if(it.done) {
            reader.releaseLock();
        }

        const data = [
            0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20,
            0x57, 0x6f, 0x72, 0x6c, 0x64, 0x21,

            0x0a,

            0x1b, 0x40
        ];

        const writer = port.writable?.getWriter();
        if (writer !== null) {
            await writer.write(new Uint8Array(data));
            await writer.releaseLock();
        }
        await port.close({ baudRate: 9600 });
    }

    return (
        <div>
            
            <button onClick={handlePrinters}>Print this out!</button>
        </div>
    )
}

export default ReceiptPrinter;