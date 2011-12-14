function plural(text, count) {
	if (count == 0)
	{
		return "";
	}
	else
	{
		return count + " " + ((count > 1) ? text + "s" : text);
	}
}

function getJobByName(jobs, jobName)
{
	return $.grep(jobs, function(job, i) {
			return ( job.name == jobName);
	});
}

function getUserFriendlyTimespan(milliseconds) {

	var time = milliseconds / 1000
	var seconds = Math.floor(time % 60)

	time /= 60	
	var minutes = Math.floor(time % 60)
	
	time /= 60
	var hours = Math.floor(time % 24)
	
	time /= 24
	var days = Math.floor(time)

	time /= 30
	var months = Math.floor(time)

	if (months > 0)
	{
		return plural("month", months) +  " " + plural("day", days);
	}

	if (days > 0)
	{
		return plural("day", days) +  " " + plural("hour", hours);
	}

	if (hours > 0)
	{
		return plural("hour", hours) + " " + plural("minute", minutes);
	}

	if (minutes > 0)
	{
		return plural("minute", minutes) + " " + plural("second", seconds);
	}

	return seconds + " seconds";
}

jQuery.fn.center = function () {

	this.css("position", "absolute");
	this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
	this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");

	return this;
}

function getParameterByName(name, defaultValue)
{
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.href);
	if(results == null)
		return defaultValue;
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
}

Array.prototype.remove = function (value)
{
	for (var i = 0; i < this.length; )
	{
		if (this[i] === value)
		{
			this.splice(i, 1);
		}
		else
		{
			++i;
		}
	}
}

function removeMessage()
{
	$("#Message").remove()
}

function getLongestJob(jobs) {

	var job = null;

	$.each(jobs, function(index, currentJob) { 
		if (job == null || getJobText(currentJob).length > getJobText(job).length)
		{
			job = currentJob;
		}
	});

	return job;
}

function getJobTitle(job) {  

	var jobTitle = job.name;

	if (job.property != null)
	{
		$.each(job.property, function(index, property) { 
			if (property.wallDisplayName != null)
			{
				jobTitle = property.wallDisplayName;
			}
		});
	}
	
	return jobTitle;
}

function getJobText(job) {  

	var jobText = getJobTitle(job);

	if (job.lastBuild != null && job.lastBuild.number != null)
	{
		jobText += ' #' + job.lastBuild.number; 
	}
	
	if(job.lastBuild.result == "FAILURE") {
	  jobText = " broke " + jobText;
  }

	return jobText;
}

function getFailureText(job) {
  var failureText = ''
  
  if(job.lastBuild.result == "FAILURE") {
    failureText = job.lastBuild.culprits[0].fullName;
  }
  
  return failureText
}
