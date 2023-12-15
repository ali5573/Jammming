import React from "react";
import styles from "./Track.module.css";

function Track(props) {
    const addTrack = () => props.onAdd(props.track);
    const RemoveTrack=()=>props.onRemove(props.track);
    const renderAction = () => {
        return (
            props.isRemoval ? <button className={styles["Track-action"]} onClick={RemoveTrack}>-</button> : <button onClick={addTrack} className={styles["Track-action"]}>+</button>
        );

    }
    

    return (
        <div className={styles.Track}>
            <div className={styles["Track-information"]}>
                {/* <h3><!-- track name will go here --></h3> */}
                <h3>{props.track.name}</h3>
                <p>
                    {props.track.artist} | {props.track.album}

                </p>

                {/* <p><!-- track artist will go here--> | <!-- track album will go here --></p> */}

            </div>
            {/* <button class="Track-action"><!-- + or - will go here --></button> */}
            {renderAction()}

        </div>
    );
}

export default Track;
