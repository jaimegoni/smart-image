
import { StandardView } from "../templates/StandardView/StandardView";

export const FaqView = ()=>{

    const githubProjectUrl = "https://github.com/jaimegoni/smart-image"

    return(
        <StandardView>
            <>
                <h1>Frequently Asked Questions</h1>
                <br/><br/><br/>
                <h2 >Do we keep any data from you or your images?</h2>
                <hr/>
                <p><b  style={{fontSize : "1.5em", fontWeight:"bolder"}}>No.</b> This page is completely built on Javascript and only runs into your browser.</p>
                <p>No data is transferred to any backend. Images and information is stored in your browser for you to use them whenever you want.</p>
                <p>We can&apos;t access to any information you upload.</p>

                <br/><br/><br/>

                <h2 >Is the page safe?</h2>
                <hr/>
                <p>We do not keep, nor analyse or track any of your information</p>
                <p><b style={{fontSize : "1.5em", fontWeight:"bolder", color:"red"}}>However</b>, this page stores the images and information in the local memory of your browser.</p>
                <p>Information located in the browser can be accessed by malware.</p>
                <p>We recommend you not to store sensitive information for long periods within your browser.</p>

                <br/><br/><br/>

                <h2 >Why aren&apos;t my images stored anymore?</h2>
                <hr/>
                <p>Images and data are stored in the cache memory of your browser. If the cache memory is cleaned, data dissapears. We recommend you to download the data after extracting it.</p>

                <br/><br/><br/>

                <h2 >I&apos;m working in Chrome and my images are not displayed in Firefox (or vice-versa). Why can&apos;t I see my images in different browsers?</h2>
                <hr/>
                <p>Images and data are stored in the cache memory of a browser. Cache memory is not shared between browsers. Thus, you can&apos;t process data with Chrome and see it in Firefox.</p>

                <br/><br/><br/>

                <h2 >Is this an open source project?</h2>
                <hr/>
                <p>Yes it is. This page is built under MIT license.</p>
                <p>You can see the original code at:</p>
                <br/>
                <a href={githubProjectUrl} target="_blank" rel="noreferrer">{githubProjectUrl}</a>
                <br/><br/><br/>

                <h2 >Project dependencies</h2>
                <hr/>
                <p>This page is styled with Booststrap 5.</p>
                <p>The project has the following external dependencies:</p>
                <ul>
                    <li>React 18.2.0.</li>
                    <li>react-router-dom 6.10.0.</li>
                    <li>tesseract.js 4.1.1: text recognition.</li>
                    <li>file-saver 2.0.5: dowload files.</li>
                    <li>jszip 3.10.1: compress files in a zip folder.</li>
                </ul>
            </>
        </StandardView>
    )
}