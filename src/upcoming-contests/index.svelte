<svelte:options tag="upcoming-contests"/>

<script>
  import { onMount } from "svelte";

  let contests = []
  onMount(async function () {
    const resp = await fetch("API_HOST" + 'api/v2/admission-contests/upcoming?raw=true')
    contests = await resp.json()
  })

  const formatDate = (str) => {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    const date = new Date(str)
    var day = date.getDate()
    var monthIndex = date.getMonth()
    var year = date.getFullYear()

    return day + ' ' + monthNames[monthIndex] + ' ' + year
  }

  export let css = "https://unpkg.com/@coding-blocks/motley/dist/app.min.css"
</script>

{#if contests.length}
  <link rel="stylesheet" href={css} />
  <div class="d-md-none d-block t-align-c mb-5 mx-auto">
    <div class="extra-bold font-36">Upcoming Events</div>
    <div class="mt-1"><a href="#" class="orange font-lg light">View All Events</a></div>
  </div>
  <div class="col-3 d-md-block d-none">
    <div>
      <i class="far fa-calendar-check orange fa-3x"></i>
      <div class="extra-bold mt-4 font-36">Upcoming Events</div>
      <h2 class="light mb-5">Participate &amp; Win Prizes</h2>
      <a href="HB_HOST/contests/admission/cast/upcoming" class="orange">
        <div class="font-mds mt-5 light">View All Events</div>
      </a>
    </div>
  </div>
  <div class="col-md-9 col-12 px-0">
    <div class="flex-row all-center px-md-2 px-0">
      <!-- <span class="font-lg extra-bold d-md-inline d-none"><a href="#">〈</a></span> -->
      <div class="row c-card-carousel pb-0 mx-md-3 mx-0 w-100">
        {#each contests as adContest}
          <div class="col-lg-6 col-md-8 col-sm-6 col-8">
            <div class="border-card p-0">
              <div class="bg-gradient-black-lr py-5 px-4 all-center white t-align-c">
                <div>
                  <h3>{adContest.name}</h3>
                  <!-- <span class="font-xl orange v-align-m mr-1">&#10625;</span> -->
                  <!-- <span class="light">Registrations open till 2 March 2019</span> -->
                  <ul class="divided-list justify-content-center mt-4 mb-0">
                    <li class="px-xl-2 px-1 t-align-l">
                      <div class="list-heading font-md extra-bold orange">{adContest.contest.stats.problemcount + adContest.contest.stats.quizcount}</div>
                      <div class="list-data font-mds">Problems</div>
                    </li>
                    <li class="px-xl-2 px-1 t-align-l">
                      <div class="list-heading font-md extra-bold orange">{adContest.contest.stats.participantcount}</div>
                      <div class="list-data font-mds">Participants</div>
                    </li>
                    <li class="px-xl-2 px-1 t-align-l">
                      <div class="list-heading font-md extra-bold orange">1 hr</div>
                      <div class="list-data font-mds">Time</div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="align-items-center t-align-c px-2 py-4">
                <div class="font-sm mb-4">STARTS</div>
                <ul class="divided-list timer d-inline-block">
                  <li class="timer-item pr-xl-2 pr-1">
                    <div class="list-heading font-lg extra-bold"> {formatDate(adContest.contest.start_time)} </div>
                    <!-- <div class="list-data">Days</div> -->
                  </li>
                  <!-- <li class="timer-item px-xl-2 px-1">
                    <div class="list-heading font-lg extra-bold">12</div>
                    <div class="list-data">Hours</div>
                  </li>
                  <li class="timer-item px-xl-2 px-1">
                    <div class="list-heading font-lg extra-bold">30</div>
                    <div class="list-data">Minutes</div>
                  </li>
                  <li class="timer-item pl-xl-2 pl-1">
                    <div class="list-heading font-lg extra-bold">25</div>
                    <div class="list-data">Seconds</div>
                  </li> -->
                </ul>
                <button class="button-solid button-orange extra-bold mt-4 mb-2 mx-auto d-block">Register</button>
              </div>
            </div>
          </div>
        {/each}
      </div>
      <span class="font-xl bold d-md-inline d-none"><a href="#">〉</a></span>
    </div>
  </div>
{/if}
