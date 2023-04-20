import fs from 'fs';
import path from 'path';

const diff = (filepath1, filepath2) => {
    const file1Content = fs.readFileSync(path.resolve(filepath1), 'utf-8');
    const file2Content = fs.readFileSync(path.resolve(filepath2), 'utf-8');
    const file1 = JSON.parse(file1Content);
    const file2 = JSON.parse(file2Content);
    const keys = Array.from(new Set([...Object.keys(file1), ...Object.keys(file2)])).sort();

    let result = "{\n";

        keys.forEach((key) => {
            const hasKey1 = file1.hasOwnProperty(key);
            const hasKey2 = file2.hasOwnProperty(key);

            if (hasKey1 && hasKey2) {
                if (file1[key] !== file2[key]) {
                    result += `  - ${key}: ${file1[key]}\n`;
                    result += `  + ${key}: ${file2[key]}\n`;
                } else {
                    result += `    ${key}: ${file1[key]}\n`;
                }
            } else if (hasKey1) {
                result += `  - ${key}: ${file1[key]}\n`;
            } else if (hasKey2) {
                result += `  + ${key}: ${file2[key]}\n`;
            }
        });

        result += "}";
        console.log(result) ;
    };



export default diff