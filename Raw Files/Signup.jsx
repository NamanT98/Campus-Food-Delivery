import { Link } from "react-router-dom";
import Left from "../../Components/left/left";
export default Signup;
import './Signup.css';

function Signup(){
    return (    
            <>
            <Left/>
            <Form/>

            </>

    );
}


function Form(){

    return (
        <>
        <div className="right">
            <div className="title">
                <div className="signupheader">
                <span className="up">Sign up</span>
                </div> 
                <div className="signupcontent">
                <span id="signin">Already have an account? <Link to="/" className="green">Sign in</Link></span>    
                </div>
               
                
                
            </div>
            <div className="signupform">
                <form>
                   <div>
                    
                    <input type="text" name="Your name" id="name" placeholder="Name" />
                    </div>

                    <div>
                    
                    <input type="text" name="Username" id="username" placeholder="UserName"/>
                    </div>

                    <div>
                    <input type="text" name="Email" id="email" placeholder="Email"/>
                    </div>

                    <div>
                    <input type="Password" name="Password" id="password" placeholder="Password" />
                    </div>

                  <label htmlFor="privacy">
                    <input type="checkbox" name="privacy policy" id="privacy" />
                    <div>
                    <span className="labellight">I agree with </span>
                    <span className="labeldark">Privacy Policy</span>
                    <span className="labellight"> and </span>
                    <span className="labeldark"> Terms of Use</span>
                    </div>
                    </label>

                </form>
                    
            </div>
          <button><span className="signupbutton">Sign Up</span></button>
        </div>
        
        </>
    );
}