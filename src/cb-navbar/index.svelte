<svelte:options tag="cb-navbar"/>

<script>
  // by default use latest motley version for unpkg
  export let css = "https://unpkg.com/@coding-blocks/motley/dist/app.min.css"
  export let topalign = "center"

  let topStyle = 'justify-content-center'

  $: switch (topalign) {
    case 'left': topStyle = 'justify-content-start'; break;
    case 'right': topStyle = 'justify-content-end'; break;
    default: topStyle = 'justify-content-center'
  }
  
</script>

<link rel="stylesheet" href={css} />

<div class="a-hb d-md-block d-none">
<div class="d-flex px-5 py-4 justify-content-between align-items-center mt-neg-70">
  <div class="col-10">
    <div class="row">
      <div class="col-2">
        <img src="images\hb_logo.png" alt="Logo">
      </div>
      <div class="col-10">
        <div class="d-flex align-items-center h-100">
          <div class="font-sm light px-3">Dashboard</div>
          <div class="font-sm light px-3">Daily Code Bytes</div>
          <div class="font-sm light px-3">Practice Problems</div>
          <div class="font-sm light px-3">Contests</div>
          <div class="font-sm light px-3">Compeititons</div>
        </div>
      </div>  
    </div>
  </div>
  <button class="button-solid button-orange">Get Started</button>
</div>



<div class="border">
  <div class="d-flex {topStyle} py-3 pr-5">
    <div class="px-3">
      <a href="#" class="orange">Courses</a>
    </div>
    <div class="px-3">
      <a href="#">Products</a>
    </div>
    <div class="px-3">
      <a href="#">About Us</a>
    </div>
    <div class="px-3">
      <a href="#">Resources</a>
    </div>
    <div class="px-3">
      <a href="#">Campus Ambassadors</a>
    </div>
    <div class="px-3">
      <a href="#">Contact Us</a>
    </div>

    <slot></slot>
  </div>
</div>

<div class="row no-gutters cb-navbar-expanded" style="overflow: hidden">
  <div class="cb-navbar-side col-3">
    <div class="font-lg offset-3">Our Courses</div>
    <div class="py-4 font-md bold selected">
      <div class="offset-3">
        <div>Classroom Courses</div>
        <div class="font-mds orange"> 
          Explore all 
        </div>
      </div>
    </div>
    <div class="py-4 font-md bold ">
      <div class="offset-3">
        <div>Online Courses</div>
        <div class="font-mds orange"> Explore all </div>
      </div>
    </div>
    
  </div>
  <div class="col-9 font-mds">
    <div class="row justify-content-around m-5">

      <ul class="col-4">
        <li class="bold">Beginner Courses</li>
        <li>C++ For Beginners</li>
        <li>Java For Beginners</li>
        <li>Python App Development</li>
      </ul>
      <ul class="col-4">
        <li class="bold">Development Courses</li>
        <li>Android App Dev</li>
        <li>Full Stack Web Dev</li>
        <li>Python Django</li>
        <li>Unity Game Development</li>
      </ul>
      <ul class="col-4">
        <li class="bold">Advanced Courses</li>
        <li>Algo++</li>
        <li>Algo.Java</li>
        <li>Competitive Programming</li>
        <li>Machine Learning</li>
      </ul>
      <ul class="col-4">
        <li class="bold">Junior Courses</li>
        <li>Code 4 Kids</li>
        <li>Maths Geek</li>
      </ul>
      <ul class="col-4">
        <li class="bold">Bootcamps</li>
        <li>React JS</li>
        <li>Blockchain</li>
        <li>Interview Preparation</li>
        <li>Game Dev</li>
        <li>Chatbot</li>
      </ul>
      <ul class="col-4">
        <li class="bold">Industrial Training</li>
      </ul>
    </div>
  </div>
</div>
</div>