import React from 'react'
import "./Center.css"
import { useState, useEffect } from 'react';



const Center = () => {

  const [pdfUrl, setPdfUrl] = useState('./abcc.pdf'); 



  useEffect(() => {
    fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      });
  }, []);





  const handleDownload = () => {

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'resume.pdf'; 
    link.click();
    console.log("hyeeee")
  };
  
  const github = () => {
    window.open(
'https://github.com/sandeep9062');
  };

  const linkdin = () => {
    window.open(
'https://www.linkedin.com/in/sandeep-saini-a6309924a');
  };


  const contact = () => {
    window.open('mailto:sandeep2001saini01@gmail'
);
  };


  const netflix = () => {
    window.open(
'https://github.com/sandeep9062/Netflix-Replica');
  };

  const recipefinder= () => {
    window.open(
'https://github.com/sandeep9062/Recipe-Finder');
  };

  const tomstockalert= () => {
    window.open(
'https://github.com/sandeep9062/Tom-StockAlert ');
  };

  const musicplayer= () => {
    window.open(
'https://github.com/sandeep9062/Music-Player');
  };

  const tompasswords= () => {
    window.open(
'https://github.com/sandeep9062/Password-Manager ');
  };

  const hariramnursery= () => {
    window.open(
'https://github.com/sandeep9062/Hariram-Nursery ');
  };

  return (
   <>
   <section id="profile" className='main1'>



<div className="boxa1">
  <img src="sandeepsaini.jpg" alt="sandeep saini" />
</div>





<div className="boxa2">

 
 <div className="info1">

  <p className="texta1">Hello, I'm</p>
  <h1 className="texta2">Sandeep Saini</h1>
  
  
  </div>



  
  
  <div className="btn-container">
    
    <button
      className="btn btn-color-2"
      onClick={handleDownload}
    >
      Download CV
    </button>
   
   
    <button className="btn btn-color-1" onClick={contact}>
      Contact Info
    </button>
  </div>


  <div id="socials-container" className='social'>
    <img src="linkedin.png"
      alt="LinkedIn profile"
      className="icon"
      onClick={linkdin}/>

    <img
      src="github.png"
      alt="Github profile"
      className="icon"
      onClick={github}
    />
  </div>
</div>
</section>












<section id="about" className='main2'>



      <div className="contb">
       <p className="tsmall">Get To Know More</p>
      <h1 className="title">About Me</h1>
      </div>



      
      <div className="contb1">


        <div className="pic2">
          <img
            src="website.jpg"
            alt="profile picture"
            className="about-pic"
          />
        </div>




        <div className="contb2">
         
         
            
            
            
            <div className="details-container">
              <img
                src="experience.png"
                alt="Experience icon"
                className="icon"
              />
              <h3>Experience</h3>
              <p>2+ years <br />Web Development</p>
            </div>
            
            
            <div className="details-container">
              <img
                src="education.png"
                alt="Education icon"
                className="icon"
              />
              <h3>Education</h3>
              <p>B.Sc. Bachelors Degree <br />M.C.A. Masters Degree</p>
            </div>


          </div>
         




          </div>



          <div className="textcont">
            <p>
              Skilled in crafting robust, scalable web applications using the <b>MERN (MongoDB, Express.js, React.js, Node.js) stack</b>. Proficient in full-stack development, designing and implementing efficient APIs, and creating intuitive user interfaces. With a strong foundation in JavaScript and modern web technologies, I'm dedicated to delivering high-quality solutions that meet client needs.
            </p>


          </div>



       


      

      
    </section>











    
    <section id="experience" className='main3'>

<div className="boxc">
      <p className="tsmall">Explore My</p>
      <h1 className="title">Experience</h1>
      </div>
      
      
      <div className="experience-details-container">


        <div className="about-containers">




          <div className="boxc1">

            
            
            


            <div className="article-container">
              
              
              
              <article className="skills">
                <img
                  src="checkmark.png"
                  alt="Experience icon"
                  className="icon"
                />
                <div >
                  <h3>HTML</h3>
                  <p>Experienced</p>
                </div>
              </article>



              <article className="skills">
                <img
                  src="checkmark.png"
                  alt="Experience icon"
                  className="icon"
                />
                <div>
                  <h3>CSS</h3>
                  <p>Experienced</p>
                </div>
              </article>
              
              
              <article className="skills">
                <img
                  src="checkmark.png"
                  alt="Experience icon"
                  className="icon"
                />
                <div>
                  <h3>React JS</h3>
                  <p>Intermediate</p>
                </div>
              </article>
              <article className="skills">
                <img
                  src="checkmark.png"
                  alt="Experience icon"
                  className="icon"
                />
                <div>
                  <h3>JavaScript</h3>
                  <p>Experienced</p>
                </div>
              </article>
              <article className="skills">
                <img
                  src="checkmark.png"
                  alt="Experience icon"
                  className="icon"
                />
                <div>
                  <h3>Tailwind</h3>
                  <p>Intermediate</p>
                </div>
              </article>
              <article className="skills">
                <img
                  src="checkmark.png"
                  alt="Experience icon"
                  className="icon"
                />
                <div>
                  <h3>MongoDB</h3>
                  <p>Basic</p>
                </div>
              </article>

              <article className="skills">
                <img
                  src="checkmark.png"
                  alt="Experience icon"
                  className="icon"
                />
                <div>
                  <h3>Java</h3>
                  <p>Experienced</p>
                </div>
              </article>
              
              <article className="skills">
                <img
                  src="checkmark.png"
                  alt="Experience icon"
                  className="icon"
                />
                <div>
                  <h3>Next JS</h3>
                  <p>Basic</p>
                </div>
              </article>


              <article className="skills">
                <img
                  src="checkmark.png"
                  alt="Experience icon"
                  className="icon"
                />
                <div>
                  <h3>Node JS</h3>
                  <p>Intermediate</p>
                </div>
              </article>
              <article className="skills">
                <img
                  src="checkmark.png"
                  alt="Experience icon"
                  class="icon"
                />
                <div>
                  <h3>Express JS</h3>
                  <p>Intermediate</p>
                </div>
              </article>
             
              <article class="skills">
                <img
                  src="checkmark.png"
                  alt="Experience icon"
                  class="icon"
                />
                <div>
                  <h3>Git</h3>
                  <p>Intermediate</p>
                </div>
              </article>



            </div>
          </div>




          
              
             
            </div>
       
       
      </div>
      
      
      

    </section>











    <section id="projects" className='main4'>

      
      
        <div className="boxd">
      <p className="tsmall">Browse My Recent</p>
      <h1 className="title">Projects</h1>
        </div>



      
         
         
         
         <div className="boxd2">




          
         <div className="projectbox">



           <div className="projectpic">
              <img src="netflix.jpg"
                alt="Project 1"
                className="project-img"
              />
            </div>


            <h2 classNames="title">Netflix Replica</h2>



            <div class="projectbtn">


              <button
                className="btn btn-color-2 project-btn"
                onClick={netflix}
              >
                Github
              </button>


              

            </div>


          </div>
          
          




          <div className="projectbox">



<div className="projectpic">
   <img src="recipe finder.jpg"
     alt="Project 2"
     className="project-img"
   />
 </div>


 <h2 classNames="title">Recipe Finder</h2>



 <div class="btn-container">


   <button
     className="btn btn-color-2 project-btn"
     onClick={recipefinder}
   >
     Github
   </button>


   
 </div>


</div>



<div className="projectbox">



<div className="projectpic">
   <img src="tom stockalert.jpg"
     alt="Project 3"
     className="project-img"
   />
 </div>


 <h2 classNames="title">TOM Stockalert</h2>



 <div class="btn-container">


   <button
     className="btn btn-color-2 project-btn"
     onClick={tomstockalert}
   >
     Github
   </button>


   
 </div>


</div>



<div className="projectbox">



<div className="projectpic">
   <img src="music player.jpg"
     alt="Project 4"
     className="project-img"
   />
 </div>


 <h2 classNames="title">Music Player</h2>



 <div class="btn-container">


   <button
     className="btn btn-color-2 project-btn"
     onClick={musicplayer}
   >
     Github
   </button>


   
 </div>


</div>


<div className="projectbox">



<div className="projectpic">
   <img src="tompasswords.jpg"
     alt="Project 3"
     className="project-img"
   />
 </div>


 <h2 classNames="title">TOMpasswords</h2>



 <div class="btn-container">


   <button
     className="btn btn-color-2 project-btn"
     onClick={tompasswords}
   >
     Github
   </button>


   
 </div>


</div>
       

<div className="projectbox">



<div className="projectpic">
   <img src="hariramnursery.png"
     alt="Project 5"
     className="project-img"
   />
 </div>


 <h2 classNames="title">Hariram Nursery</h2>



 <div class="btn-container">


   <button
     className="btn btn-color-2 project-btn"
     onClick={hariramnursery}
   >
     Github
   </button>


   
 </div>


</div>
       


          
          
   








     </div>
    </section>











    <section id="contact" className='main5'>

      <div className="boxe">


      <p className="tsmall">Get in Touch</p>
      <h1 className="title">Contact Me</h1>

    </div>


      <div className="contact-info-upper-container">
        
        
        <div className="contact-info-container">
          <img
            src="email.png"
            alt="Email icon"
            className="icon contact-icon email-icon"
          />
          <p><a href="mailto:sandeep2001saini01@gmail.com">sandeep2001saini01@gmail.com</a></p>
        </div>
       
       
        <div className="contact-info-container">
          <img
            src="linkedin.png"
            alt="LinkedIn icon"
            className="linkdin-icon"
          />
          <p><a href="https://www.linkedin.com/in/sandeep-saini-a6309924a">LinkedIn</a></p>
        </div>
      
  
   
    <div className="contact-info-container">
          <img
            src="phone.svg"
            alt="phone icon"
            className="icon contact-icon email-icon"
          />
          <p><a href="callto:9729907448">9729907448</a></p>
        </div>
   




        </div>
        </section>


    <footer>
      <nav>
        <div className="nav-links-container boxe1">
          <ul className="nav-links boxe2">
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>
      
    </footer>


    
  





   
   
   
   
   </>
  )
}

export default Center
