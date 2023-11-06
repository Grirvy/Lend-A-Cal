/* Wrap all code that interacts with the DOM in a call to jQuery to ensure that
   the code isn't run until the browser has finished rendering all the elements
   in the html.
*/

$(document).ready(function () {
  // Function to update the hour blocks based on the current time
  function updateHourBlocks() {
    const currentHour = new Date().getHours();

    $(".time-block").each(function () {
      const blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Update hour blocks first and set interval to update every minute
  updateHourBlocks();
  setInterval(updateHourBlocks, 60000);

  // Click event listener for the save button within each time block
  $(".saveBtn").on("click", function () {
    const description = $(this).siblings(".description").val();
    const timeBlockId = $(this).closest(".time-block").attr("id");
    localStorage.setItem(timeBlockId, description);
  });

  // Load stored events from local storage and set textarea values
  $(".time-block").each(function () {
    const blockId = $(this).attr("id");
    const storedEvent = localStorage.getItem(blockId);

    if (storedEvent) {
      $(this).find(".description").val(storedEvent);
    }
  });

  // Display the current date in the header of the page
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  $("#currentDay").text(currentDate);
});

