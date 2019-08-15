<svelte:options tag="landing-navbar" />

<script>
  import cbNavbar from '../cb-navbar/index.svelte'
  import MobileClassroomCourses from './mobile-classroom-courses.svelte'
  import MobileOnlineCourses from './mobile-online-courses.svelte'


  // by default use latest motley version for unpkg

  export let css = "https://unpkg.com/@coding-blocks/motley/dist/app.min.css"
  export let tab = "classroom"
  let showHamburger = false
  const toggleHamburgerNav = () => showHamburger = !showHamburger
</script>

<link rel="stylesheet" href={css} />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/fontawesome.min.css" integrity="sha256-AaQqnjfGDRZd/lUp0Dvy7URGOyRsh8g9JdWUkyYxNfI=" crossorigin="anonymous" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/solid.css" integrity="sha256-xKY109Q6SWqmez9cY4ZDiL/KPacElX8usnXjmFO7p7g=" crossorigin="anonymous" /> 

<div class="a-hb p-0">
    <div
      class="d-flex px-5 py-4 justify-content-between align-items-center mt-neg-70">
      <div class="d-md-none">
        <div class="hamburger-menu mr-3">
          <div class="ham-toggle" on:click={toggleHamburgerNav}>
            <div class="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-10">
        <div class="row">
          <div class="col-2">
            <img src="/images/hb_logo.png" alt="Logo" />
          </div>
          <div class="col-10 dsp-none-md">
            <div class="d-flex align-items-center h-100">
              <!-- <div class="font-sm light px-3">
                <a href="/app">
                  Dashboard
                </a>
              </div>
              <div class="font-sm light px-3">
                <a href="/app/dcb">
                  Daily Code Bytes
                </a>
              </div>
              <div class="font-sm light px-3">
                <a href="/app/practice">
                  Practice Problems
                </a>
              </div>
              <div class="font-sm light px-3">
                <a href="/app/contests">
                  Contests
                </a>
              </div>
              <div class="font-sm light px-3">
                <a href="/app/competitions">
                  Compeititons
                </a>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <button class="button-solid button-orange">
        Coming Soon
      </button>
    </div>
</div>

{#if showHamburger}

<div class="hamburger-nav b-right overflow-y-auto no-scrollbar">
	<div class="d-flex py-3 justify-content-between align-items-center hamburger-nav__top-bar">
		<img src="\images\hb_logo_monochrome_full_dg.png" alt="HB" class="hamburger-nav__ham-logo ml-4">
		<img src="\images\wrong_g.png" alt="#" class="mr-4 hamburger-nav__cross pointer" on:click={toggleHamburgerNav}>
	</div>
	<div class="divider-h"></div>

	<div class="mt-5 px-4 overflow-y-auto no-scrollbar">
		<div class="d-flex justify-content-between">
			<div class="card-md extra-bold orange">Courses</div>
			<a href="#" class="orange"><i class="fas fa-angle-up fa-lg"></i></a>
		</div>
		<div class="my-4 pl-4">
			<div class="hamburger-nav__menu-element {tab == 'classroom' && 'active'}">
				<div class="card-md extra-bold" on:click={() => tab = "classroom"}>Classroom Courses</div>
				<div class="card-sm light"><a href="#" class="orange">Explore All</a></div>
      </div>
      {#if tab=="classroom"}
      <MobileClassroomCourses />
      {/if}
		</div>
		<div class="my-4 pl-4">
			<div class="hamburger-nav__menu-element {tab == 'online' && 'active'}">
				<div class="card-md extra-bold" on:click={() => tab = "online"}>Online Courses</div>
				<div class="card-sm light"><a href="#" class="orange">Explore All</a></div>
      </div>
      {#if tab=="online"}
      <MobileOnlineCourses />
      {/if}
		</div>
	  <div class="card-md light my-4">
      <a href="https://codingblocks.com/campus-ambassador-program.html" target="blank">
        Campus Ambassadors
      </a>
    </div>
    <div class="card-md light my-4">
      <a href="https://codingblocks.com/about" target="blank">
        About Us
      </a>
    </div>
    <div class="card-md light my-4">
      <a href="https://codingblocks.com/centres" target="blank">
        Contact Us
      </a>
    </div>
	</div>
</div>
{/if}
<cb-navbar topalign="right"> </cb-navbar>
