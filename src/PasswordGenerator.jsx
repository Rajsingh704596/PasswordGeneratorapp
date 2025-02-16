import { useRef, useEffect, useCallback, useState } from "react";

export const PasswordGenerator = () => {
    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [characterAllowed, setCharacterAllowed] = useState(false);
    const [password, setPassword] = useState("");

    const copyPassRef = useRef(null);  // used for reference from input field for copy that value which is readonly and manipulate it 

    // useCallback use for function optimization/memorize where logic store temporary in cache
    const passwordGenerator = useCallback(() => {
        let pass = "";           // here we store all character in loop
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if (numberAllowed) str += "0123456789";
        if (characterAllowed) str += "~!@#%^&*(){}[]-_=+";

        // length basis loop run
        for (let i = 1; i <= length; i++) {
            let charIndexValue = Math.floor(Math.random() * str.length + 1);    // here we get number        
            pass += str.charAt(charIndexValue);   //.charAt method use to get position of single character according charIndexValue which is automatic generate  // and add(append) in pass when loop not end  or length not complete
        }

        setPassword(pass);
    }, [length, numberAllowed, characterAllowed, setPassword]); // dependency used that value for cache

    // for copy password
    const copyPasswordToClipboard = useCallback(() => {
        copyPassRef.current?.select();     // for select effect use   // optional select ? use may be current value zero so it's handle and not take
        // we can give range for select 
        copyPassRef.current?.setSelectionRange(0, 9);             //so 9 value select
        window.navigator.clipboard.writeText(password);     //without useRef we get password for copy in clipboard but it not show in input field like select , but useRef to show effect in ui that input field select that help for user experience
    }, [password]);

    useEffect(() => {
        passwordGenerator();
    }, [length, characterAllowed, numberAllowed, passwordGenerator]);

    return (
        <>
            <div className="w-full h-screen bg-slate-900 text-white">
                <div className="p-4 md:p-32">
                    <div className="w-full m-30 max-w-md mx-auto p-4 md:p-12 bg-slate-400 rounded-lg">
                        <h1 className="text-center text-2xl md:text-4xl font-bold">Password Generator</h1>

                        <div className="m-4 rounded-lg text-black flex shadow-md">
                            <input type="text" readOnly value={password} className="p-2 outline-none w-full bg-blue-200 rounded-l-lg" ref={copyPassRef} />
                            <button className="bg-blue-500 p-2 rounded-r-lg text-white hover:bg-blue-700 cursor-pointer" onClick={copyPasswordToClipboard}>Copy</button>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col md:flex-row md:items-center gap-2">
                                <input type="range" min={6} max={50} value={length} onChange={(e) => setLength(e.target.value)} className="cursor-pointer" />
                                <label>Length: {length}</label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="no" checked={numberAllowed} onChange={() => setNumberAllowed((prev) => !prev)} />
                                <label htmlFor="no">Number</label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="sym" checked={characterAllowed} onChange={() => setCharacterAllowed((prev) => !prev)} />
                                <label htmlFor="sym">Special-Symbol</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};