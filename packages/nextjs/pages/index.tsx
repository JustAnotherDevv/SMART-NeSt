// @ts-nocheck
import React, {useState} from 'react';
import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import {execHaloCmdWeb} from "@arx-research/libhalo/api/web.js";

const Home: NextPage = () => {
  const [statusText, setStatusText] = useState('Click on the button');

    async function btnClick() {
        const command = {
            name: "sign",
            keyNo: 1,
            message: "010203",
            /* uncomment the line below if you get an error about setting "command.legacySignCommand = true" */
            // legacySignCommand: true,
        };

        let res;

        try {
            // --- request NFC command execution ---
            res = await execHaloCmdWeb(command, {
                statusCallback: (cause) => {
                    if (cause === "init") {
                        setStatusText("Please tap the tag to the back of your smartphone and hold it...");
                    } else if (cause === "retry") {
                        setStatusText("Something went wrong, please try to tap the tag again...");
                    } else if (cause === "scanned") {
                        setStatusText("Tag scanned successfully, post-processing the result...");
                    } else {
                        setStatusText(cause);
                    }
                }
            });
            // the command has succeeded, display the result to the user
            setStatusText(JSON.stringify(res, null, 4));
        } catch (e) {
            // the command has failed, display error to the user
            setStatusText('Scanning failed, click on the button again to retry. Details: ' + String(e));
        }
    }

  return (
    <>
      {/* <MetaHeader /> */}
      <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordWrap: "break-word" }}>
              {statusText}
            </div>
            <button onClick={() => btnClick()}>Sign message 010203 using key #1</button>
      {/* <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5"> */}
          {/* <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1> */}
          {/* <pre style={{fontSize: 12, textAlign: "left", whiteSpace: "pre-wrap", wordWrap: "break-word"}}>
                {statusText}
            </pre>
            <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
              {statusText}
            </div>
            <button onClick={() => btnClick()}>Sign message 010203 using key #1</button>
          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/pages/index.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contract
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Home;
