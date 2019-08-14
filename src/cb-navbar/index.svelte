<svelte:options tag="cb-navbar" />

<script>
  import ClassroomCourses from './classroom-courses.svelte'
  import OnlineCourses from './online-courses.svelte'

  // by default use latest motley version for unpkg
  export let css = "https://unpkg.com/@coding-blocks/motley/dist/app.min.css"
  export let topalign = "center"
  export let expanded = false
  export let tab = "classroom"

  let topStyle = 'justify-content-center'

  $: switch (topalign) {
    case 'left': topStyle = 'justify-content-start'; break;
    case 'right': topStyle = 'justify-content-end'; break;
    default: topStyle = 'justify-content-center'
  }

  const toggleExpanded = () => expanded = !expanded

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

  <style>
    a:hover {
      text-decoration: underline;
    }

    .hover-grey.selected:hover {
      background: unset;
    }
  </style>

  <link rel="stylesheet" href={css} />

  <div class="border">
    <div class="d-flex {topStyle} py-3 pr-5">
      <div class="px-3">
        <a href="#" class="orange">Courses</a>
      </div>
      <span class="px-3 pointer" on:click={toggleExpanded}>
        Courses
        <i class="ml-1 fas fa-chevron-up"></i>
      </span>
      <div class="px-3">
        <a href="#">Products</a>
      </div>
      <div class="px-3">
        <a href="https://codingblocks.com/about.html">About Us</a>
      </div>
      <div class="px-3">
        <a href="https://codingblocks.com/resources">Resources</a>
      </div>
      <div class="px-3">
        <a href="https://codingblocks.com/campus-ambassador-program.html">Campus Ambassadors</a>
      </div>
      <div class="px-3">
        <a href="https://codingblocks.com/centres/">Contact Us</a>
      </div>
    </div>

    {#if expanded}
  <div class="row no-gutters cb-navbar-expanded" style="overflow: hidden">
    <div class="cb-navbar-side col-3">
      <div class="font-lg offset-3">Our Courses</div>
      <div class="py-4 font-md bold hover-grey {tab == 'classroom' && 'selected'}" on:click={() => tab = "classroom"}>
        <div class="offset-3">
          <div>Classroom Courses</div>
          <a href="https://codingblocks.com/classroom-courses/" class="font-mds orange"> 
            Explore all 
          </a>
        </div>
      </div>
      <div class="py-4 font-md bold hover-grey {tab == 'online' && 'selected'}"  on:click={() => tab = "online"}>
        <div class="offset-3">
          <div>Online Courses</div>
          <a href="https://online.codingblocks.com/courses" class="font-mds orange"> 
            Explore all 
          </a>
        </div>
      </div>
      
    </div>
    <div class="col-9 font-mds">
      {#if tab=="classroom"}
        <ClassroomCourses />
      {:else}
        <OnlineCourses />
      {/if}
    </div>
  </div>
</div>
</div>
{/if}
