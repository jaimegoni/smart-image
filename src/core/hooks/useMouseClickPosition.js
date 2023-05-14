import { useEffect, useState } from "react"

export const useMouseClickPosition = (targetDivId)=>{

    let isClicking = false;

    const [{xInitial, yInitial}, setInitialCoordinates] = useState({xInitial : 0, yInitial : 0});
    const [{xFinal, yFinal}, setFinalCoordinates] = useState({xFinal : 0, yFinal : 0});
    const [{xCurrent, yCurrent}, setCurrentCoordinates] = useState({xCurrent:0, yCurrent:0})


    const onMouseDown = (event)=>{

        const clickedElementId = event.target.id;
        if (clickedElementId === targetDivId){
            setInitialCoordinates(
                {
                    xInitial: Math.round(event.clientX),
                    yInitial: Math.round(event.clientY),
                }
            );
            setFinalCoordinates(
                {
                    xFinal : 0,
                    yFinal : 0
                }
            )
            setCurrentCoordinates(
                {
                    xCurrent: Math.round(event.clientX),
                    yCurrent: Math.round(event.clientY)
                }
            );
            isClicking = true;
        }
    }

    const onMouseUp = (event)=>{
        if (isClicking){
            setFinalCoordinates(
                {
                    xFinal : Math.round(event.clientX),
                    yFinal : Math.round(event.clientY)
                }
            );
            setCurrentCoordinates(
                {
                    xCurrent: 0,
                    yCurrent: 0
                }
            );
            isClicking = false;

        }
    }

    const onMouseMove = (event) =>{
        if (isClicking){
            setCurrentCoordinates(
                {
                    xCurrent: Math.round(event.clientX),
                    yCurrent: Math.round(event.clientY)
                }
            );
        }
    }

    useEffect(
        ()=>{
            document.addEventListener("mousedown", onMouseDown);
            document.addEventListener("mouseup", onMouseUp);
            document.addEventListener("mousemove", onMouseMove);

            return(()=>{
                document.removeEventListener("mousedown", onMouseDown);
                document.removeEventListener("mouseup", onMouseUp);
                document.removeEventListener("mousemove", onMouseMove);
            })

        }
        ,[])
    
    /*
    useEffect(()=>{
        console.log(`xInitial: ${xInitial}, yInitial: ${yInitial} xCurrent: ${xCurrent}, yCurrent: ${yCurrent}`)
    },[xCurrent, yCurrent])
    */
    
    
    return(
        {
            xInitial,
            yInitial,
            xFinal,
            yFinal,
            xCurrent,
            yCurrent
        }
    )
}