<svelte:options tag="landing-navbar" />

<script>
  import cbNavbar from '../cb-navbar/index.svelte'

  // by default use latest motley version for unpkg
  export let css = "https://unpkg.com/@coding-blocks/motley/dist/app.min.css"

</script>

<link rel="stylesheet" href={css} />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/fontawesome.min.css" integrity="sha256-AaQqnjfGDRZd/lUp0Dvy7URGOyRsh8g9JdWUkyYxNfI=" crossorigin="anonymous" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/solid.css" integrity="sha256-xKY109Q6SWqmez9cY4ZDiL/KPacElX8usnXjmFO7p7g=" crossorigin="anonymous" /> 

<div class="a-hb">
    <div
      class="d-flex px-5 py-4 justify-content-between align-items-center mt-neg-70">
      <div class="col-10">
        <div class="row">
          <div class="col-2">
            <img src="images\hb_logo.png" alt="Logo" />
          </div>
          <div class="col-10">
            <div class="d-flex align-items-center h-100">
              <div class="font-sm light px-3">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="/app" class="button-solid button-orange">
        Get Started
      </a>
    </div>
</div>
<cb-navbar topalign="right" css={css}> </cb-navbar>