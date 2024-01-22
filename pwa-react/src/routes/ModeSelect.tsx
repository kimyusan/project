<<<<<<< HEAD
import React from 'react'
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { SelectBox } from "../styles/Camera/ModeSelect"

const Camera = () => {
  return (
    <SelectBox>
      <Link to="/camera/solo">
        <Paper elevation={3}>
          혼자찍기
        </Paper>
      </Link>

      <Link to="/camera/couple">
        <Paper elevation={3}>
          같이찍기
        </Paper>
      </Link>
    </SelectBox>
=======
import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { SelectBox } from "../styles/Camera/ModeSelect"
import { BurgerButton } from "../styles/common/hamburger";
import Navbar from "../components/Navbar";

const Camera = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const toggleNavigation = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };
  return (
    <>
      <BurgerButton onClick={toggleNavigation}>
        {isNavigationOpen ? "×" : "☰"}
      </BurgerButton>

      <Navbar isOpen={isNavigationOpen} />
      <SelectBox>
        <Link to="/camera/solo">
          <Paper elevation={3}>
            혼자찍기
          </Paper>
        </Link>

        <Link to="/camera/couple">
          <Paper elevation={3}>
            같이찍기
          </Paper>
        </Link>
      </SelectBox>
    </>

>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff
  )
}

export default Camera