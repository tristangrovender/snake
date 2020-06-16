import React from "react";
import { red } from "color-name";

function getCellColor(yIndex, xIndex, snake) {
    const snakeCheck = snake.body.some(item => {
        return xIndex === item.x && yIndex === item.y;
    });

    if (snakeCheck) {
        return "#308cd4";
    }

    if (yIndex % 2) {
        if (xIndex % 2) {
            return "#263445";
        } else {
            return "#202937";
        }
    } else {
        if (xIndex % 2) {
            return "#202937";
        } else {
            return "#263445";
        }
    }
}

function TargetCircle() {
    return (
        <span
            style={{
                position: "absolute",
                backgroundColor: "red",
                width: "60%",
                height: "60%",
                borderRadius: "100%"
            }}
        ></span>
    );
}

export default function Grid({ rowCount, columnCount, snake, targetCircle }) {
    console.log(snake);
    return (
        <div className="game-box">
            {Array.from(new Array(rowCount)).map((item, yIndex) => {
                return (
                    <div className="row">
                        {Array.from(new Array(columnCount)).map(
                            (item, xIndex) => (
                                <div
                                    className="column"
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        position: "relative",
                                        backgroundColor: getCellColor(
                                            yIndex,
                                            xIndex,
                                            snake
                                        )
                                    }}
                                >
                                    {targetCircle.x === xIndex &&
                                    targetCircle.y === yIndex ? (
                                        <TargetCircle />
                                    ) : null}
                                </div>
                            )
                        )}
                    </div>
                );
            })}
        </div>
    );
}
