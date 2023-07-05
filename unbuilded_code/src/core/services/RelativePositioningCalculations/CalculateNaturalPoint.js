

export const calculateNaturalPoint = (displayPoint, containerOffset, displayDistance, naturalDistance)=>{

    const naturalPoint = Math.round((displayPoint - containerOffset)*naturalDistance/displayDistance);

    return naturalPoint;
}