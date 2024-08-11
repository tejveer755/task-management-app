import React, { useState } from "react";

const Overviewcard = ({ icon, fill, title, num, total }) => {
    // State to manage the background color of the icon container
    const [backgroundColor, setBackgroundColor] = useState({ backgroundColor: fill });

    return (
        <div className="square_card">
            {/* Icon container with dynamic background color */}
            <div className="icon" style={backgroundColor}>
                <img src={icon} alt={`${title} icon`} />
            </div>

            {/* Title of the card */}
            <h2>{title}</h2>

            {/* Display the number of tasks, with a special format for "Completed Tasks" */}
            <h3>
                {title === "Completed Tasks" ? (
                    <>
                        {num} <span>/{total}</span>
                    </>
                ) : (
                    num
                )}
            </h3>
        </div>
    );
};

export default Overviewcard;
