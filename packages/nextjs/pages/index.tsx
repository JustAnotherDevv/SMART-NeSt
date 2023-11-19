// @ts-nocheck
import React, { useState } from "react";
import Link from "next/link";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  const [statusText, setStatusText] = useState([]);
  const [infoText, setInfoText] = useState([]);
  const [isCommunity, setIsCommunity] = useState(false);

  function extractCharacters(inputString) {
    if (inputString.length < 6) {
      return "String is too short";
    }

    const firstThree = inputString.substring(0, 3);
    const lastThree = inputString.substring(inputString.length - 3);

    return firstThree + " ... " + lastThree;
  }

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
        statusCallback: cause => {
          if (cause === "init") {
            setInfoText("Please tap the tag to the back of your smartphone and hold it...");
          } else if (cause === "retry") {
            setInfoText("Something went wrong, please try to tap the tag again...");
          } else if (cause === "scanned") {
            setInfoText("Tag scanned successfully, post-processing the result...");
          } else {
            setInfoText(cause);
          }
        },
      });
      // the command has succeeded, display the result to the user
      let tempStatus = statusText;
      tempStatus.push(res);
      setStatusText(tempStatus);
    } catch (e) {
      // the command has failed, display error to the user
      // setStatusText('Scanning failed, click on the button again to retry. Details: ' + String(e));
    }
  }

  async function createCommunity() {
    setIsCommunity(true);
  }

  return (
    <div className="w-full flex flex-col justify-between pt-8 h-screen">
      {/* <MetaHeader /> */}
      {/* <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordWrap: "break-word" }}>
              {JSON.stringify(statusText[statusText.length - 1].etherAddress, null, 4)}
            
            <ul> */}
      <div>
        <h2 className="mx-auto text-center font-extrabold text-2xl">Network State XYZ</h2>
        {isCommunity ? <h2 className="mx-auto text-center font-thin text-lg">Citizens: {statusText.length}</h2> : ""}
      </div>
      <ul>
        {statusText.length != 0
          ? statusText.map((item, index) => (
              <div className="flex flex-row w-full">
                {/* {item.ethereumAddress ? ( */}
                <li className="bg-secondary rounded-md px-2 py-3 mx-auto my-6 w-full justify-evenly flex" key={index}>
                  <div className="font-bold">Address: {extractCharacters(item.etherAddress)}</div>{" "}
                  <div>Pub Key: {extractCharacters(item.publicKey)}</div>
                </li>
                {/* ) : ""} */}
              </div>
            ))
          : ""}
      </ul>

      <div className="pb-48 w-full flex mx-auto flex-col px-4 gap-y-4">
        {isCommunity ? (
          <button onClick={() => btnClick()} className="btn btn-primary">
            Authorize with ERS
          </button>
        ) : (
          ""
        )}
        {!isCommunity ? (
          <>
            <input type="text" placeholder="Name" className="input input-bordered w-full mt-8" />
            <input type="text" placeholder="Description" className="input input-bordered w-full mt-8" />
            <button onClick={() => createCommunity()} className="btn btn-primary">
              Create Community
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Home;
