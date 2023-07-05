
import { StandardView } from "../../templates/StandardView/StandardView";

import './UsageView.css';

export const UsageView = ()=>{

    return(
        <StandardView>
            <>
                <h1>Usage</h1>
                <br/><br/><br/>
                <h2 >Original purpose</h2>
                <hr/>
                <p>The original purpose of this website was: given a plan with multiple drawings of different references, have a tool to quickly find a reference and see its graphic representation.</p>
                <div className="example__image--div">
                    <img src="/images/text_recon_example.PNG" alt="exampleImage" className="example__image--img"/>
                </div>
                <br/><br/><br/>

                <h2>Upload an image</h2>
                <hr/>
                <p>Accepted file types are: png and jpeg.</p>
                <p>Files have a limit size of 1MB. They are stored in the local memory of your browser, and this local memory has a size limit.</p>
                <p>To upload an image, click on its button on the home page:</p>
                <div className="example__image--div">
                    <img src="/images/uploadButtonExample.png" alt="uploadButtonExample" className="example__image--img"/>
                </div>
                <p>Give the image a name and upload a file by dragging and dropping or selecting a file:</p>
                <div className="example__image--div">
                    <img src="/images/uploadModalExample.png" alt="uploadModalExample" className="example__image--img"/>
                </div>
                <p>After introducing the information, it is possible to delete the image and change it, or continue to the next step:</p>
                <div className="example__image--div">
                    <img src="/images/uploadModalExample2.png" alt="uploadModalExample2" className="example__image--img"/>
                </div>


                <br/><br/><br/>

                <h2 >Configure the image and write notes</h2>
                <hr/>
                <p>After uploading an image, the website re-directs to the image&apos;s configuration page.</p>
                <p>Here the user can:</p>
                <ul>
                    <li>Change to the &quot;View&quot; page.</li>
                    <li>Modify the width of the image.</li>
                    <li>Select whether to auto-detect the text when writing a note.</li>
                </ul>
                <div className="example__image--div">
                    <img src="/images/configurationPage.PNG" alt="configurationPage" className="example__image--img"/>
                </div>
                <p>Notes can be written by clicking and dragging the mouse over the image, from left to right side, from top to the bottom.</p>
                
                <div className="example__image--div">
                    <video width="600" controls className="note__write--video">
                        <source src="/videos/text_recon.mp4" type="video/mp4"/>
                        Your browser does not support HTML video.
                    </video>
                </div>

                <br/><br/><br/>

                <h2 >Visualize and filter notes</h2>
                <hr/>
                <p>In the view page, notes appear hidden until the user clicks them.</p>
                <p>Here the user can:</p>
                <ul>
                    <li>Show the specific notes by clicking on them.</li>
                    <li>Show all the notes.</li>
                    <li>Hide all the notes.</li>
                    <li>Use a filter to select the specific notes to show.</li>
                </ul>
                <div className="example__image--div">
                    <img src="/images/viewExample.png" alt="viewExample" className="example__image--img"/>
                </div>
                <p>When clicking on the filter note&apos;s button, a modal with a table shows up. Here the user can filter by a keyword and select those notes wanted to be shown.</p>
                <div className="example__image--div">
                    <img src="/images/filterExample.png" alt="filterExample" className="example__image--img"/>
                </div>

                <br/><br/><br/>

                <h2 >Download and upload smart images</h2>
                <hr/>
                <p>Storing data in the cache memory of the browser is not safe. Thus, the possibility of downloading the smart images and uploading them has been included.</p>
                <p>Smart images are downloaded as a .json file and can be uploaded only in this format.</p>
                <p>The option of deleting the images one by one or all together has also been included.</p>
                <div className="example__image--div">
                    <img src="/images/otherActions.png" alt="otherActions" className="example__image--img"/>
                </div>

            </>
        </StandardView>
    )
}