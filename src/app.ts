import * as fs from "fs/promises";
import figlet from "figlet";
import { extractNameFromZipFile } from "./utils";
import { HfInference } from '@huggingface/inference'

const hf = new HfInference("");
const iexecOut: string | undefined = process.env.IEXEC_OUT || "/tmp/iexec_out";
const iexecIn: string | undefined = process.env.IEXEC_IN || "/tmp/iexec_in";
const dataFileName: string | undefined =
    process.env.IEXEC_DATASET_FILENAME || "protectedData.zip";

(async () => {
    try {
        const result = await hf.tableQuestionAnswering({
            model: 'google/tapas-large-finetuned-wtq',
            inputs: {
                query: 'Top repo by stars and by contributors',
                table: {
                    Repository: ['Transformers', 'Datasets', 'Tokenizers'],
                    Stars: ['36542', '4512', '3934'],
                    Contributors: ['651', '77', '34'],
                    'Programming language': ['Python', 'Python', 'Rust, Python and NodeJS']
                }
            }
        });
        console.log(result);
        const name = await extractNameFromZipFile(`${iexecIn}/${dataFileName}`);

        // Write hello to fs
        let text: string =
            process.argv.length > 2
                ? `Hello, ${process.argv[2]}! it's ${name}!`
                : `Hello, World! it's ${name}!`;
        text = `${figlet.textSync(text)}\n${text}`; // Let's add some art for e.g.

        // Append some results
        if (!iexecOut) {
            throw new Error("Environment variable IEXEC_OUT is not set.");
        }

        await fs.writeFile(`${iexecOut}/result.txt`, text);
        console.log(text);
        // Declare everything is computed
        const computedJsonObj = {
            "deterministic-output-path": `${iexecOut}/result.txt`,
        };
        await fs.writeFile(
            `${iexecOut}/computed.json`,
            JSON.stringify(computedJsonObj)
        );
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
