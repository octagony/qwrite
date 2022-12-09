import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./Home.module.css";
import { AiOutlineFullscreen, AiOutlineBgColors } from "react-icons/ai";

interface Input {
  main: string;
  title: string;
}

const titlePlug = "Welcome to QWrite!";
const mainPlug = "Minimal web text editor";

const Home = () => {
  const [userInput, setUserInput] = useState<Input>(
    JSON.parse(
      localStorage.getItem("test") ||
        `{"title":"${titlePlug}","main":"${mainPlug}"}`
    )
  );

  useEffect(()=>{
    userInput.title.length === 0 && setUserInput({...userInput, title: "Welcome to QWrite!"})
  },[])

  useEffect(() => {
    localStorage.setItem("test", JSON.stringify(userInput));
  }, [userInput]);

  const updateInputs = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value });
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.main}>
        <input
          name="title"
          type="text"
          value={userInput.title}
          className={styles.title_input}
          onChange={updateInputs}
        />
        <textarea
          name="main"
          className={styles.main_input}
          onChange={updateInputs}
          value={userInput.main}
        />
        <div className={styles.panel}>
          <div className={styles.fullscreen}>
            <AiOutlineFullscreen size={25} />
          </div>
          <div className={styles.color}>
            <AiOutlineBgColors size={25} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
