angular.module('app.directive')
  .directive("chromeCast", ["$interval", "$q", function ($interval, $q) {
    var icon = {
      off: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAWCAYAAAA8VJfMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDRDY5RDVDNjREMjA2ODExODA4M0Q4NDQ4QTQyQ0VFNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5RDAwNjlEREE4NkYxMUUzQTg2NkNDNkQ4NzU5MTdGQyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RDAwNjlEQ0E4NkYxMUUzQTg2NkNDNkQ4NzU5MTdGQyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzQzMzEzODMxMTIwNjgxMTgwODNFNkE2MzZGQkRDMjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0Q2OUQ1QzY0RDIwNjgxMTgwODNEODQ0OEE0MkNFRTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Vv5dCAAABAklEQVR42mL8//8/A70BE8MAABYYg5GRkeZeBoYqI4qlMLtpaeeABu+opcPb0iP0spQRViIB8ykdsikknzIBLXsCxDuB7AoglqOXb/8j4T9AvIxGloN8ygALWQUgjgbi1UD8E2r5JyD2paWlyEAFiDdCLf4LxHm0svQGEE8AYn0kBeVQS/8BcTgtLIXFJ8iCmUDMCVVUARX/TKU4RrHUEoinIMXnHiBmgypcBxVbSqs4NQTip1BLpkDFZKGOAaVqeWpauhaIVZEshlmiDRVbBnVIKZRfiZbNiMbocfoOyeIpULE+KD8Uyt8B00QpRk5Ia6CWWED5l6F8dSj/EbUsBQgwAJYE9qTAvy6WAAAAAElFTkSuQmCC",
      on:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAWCAYAAAA8VJfMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDRDY5RDVDNjREMjA2ODExODA4M0Q4NDQ4QTQyQ0VFNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5RDE5QURCNEE4NkYxMUUzQTg2NkNDNkQ4NzU5MTdGQyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RDE5QURCM0E4NkYxMUUzQTg2NkNDNkQ4NzU5MTdGQyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzQzMzEzODMxMTIwNjgxMTgwODNFNkE2MzZGQkRDMjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0Q2OUQ1QzY0RDIwNjgxMTgwODNEODQ0OEE0MkNFRTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7rJQs1AAABe0lEQVR42uzWzyuEQRzH8XnYSHGQG1GSFAc5uCilxE1Oe1Buak8iFz+Wg4OfKe2BgygXnlJE7GFvLg57E1FqJUok5R+Qxnv0fWrW0c7z7MXUq+8z07afmWdmn2c9rbWKupWoIrRYcOHNqtCXrBeVlxdqD8okCg3Ia/aiYr8/7GrF9qTtxRRtT/9DIwu9iDyUE9YtlxN4DfXhwNF+pt7iHD7hKca2JXwO5WGstA79WMYDgT61BgvowUsYoY0YxiG+MIQbDCCLTuSchnI7H7GPOP02nKIKJxiTlfbi3eWe3lEz2CX4ijrI2BR1CSm84QAjMiEnt7cF47gkbAsVhK/SN09P88zcQQPOZPVOQruwiU8kzJcTXEZdwTEq5ZCZNu/kZRD8cyCog5JGrUxiFPW4Ryma8FTIqy1423gqqY+o0wzkJDgrIe3y+/XlRE9iDTOy339+iStCNT7Q/LPqpN6QsXXpx6WfMX0XgsdgtbVve1L7pF5LbXX1k/kWYACxza/u9NlkGAAAAABJRU5ErkJggg==",
      animations: [
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAWCAYAAAA8VJfMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDRDY5RDVDNjREMjA2ODExODA4M0Q4NDQ4QTQyQ0VFNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5RDA0REJBRkE4NkYxMUUzQTg2NkNDNkQ4NzU5MTdGQyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RDA0REJBRUE4NkYxMUUzQTg2NkNDNkQ4NzU5MTdGQyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzQzMzEzODMxMTIwNjgxMTgwODNFNkE2MzZGQkRDMjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0Q2OUQ1QzY0RDIwNjgxMTgwODNEODQ0OEE0MkNFRTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7zQRq1AAABJklEQVR42uyUzUpCQRiGHWnRjy6EpHJREApai3btW3QD3o3ewLma7sKNQW1S2gTZv4Ug2kIX4ekZeAc87pSZI0QDD/NxZg7vfL8mjuNM2iubWcPacIYxJrjLRNUkRJ12SM21hvdf9G+LttISNW4i0acptKn6FLFL9m8YwBtM0phIm6IIVXiH+5Di1t1tKMAB7CnPP3ALnyHCu5jIHTiBfY2tLjyGEL2AL3iBsS6UFWp7fqOQ+yskyIljeJJ3D7pYgzMY+sxxVv3Zgxkcwbm+W+G+HlbzPRysF3cSn8IunOq8o8eUYMufaDO+ggr2CK7nPM4rpB/KbUn/NFRky5LwtA7tOeFniRzqTl970U4viGxBrMLi7LV9Gsl+dSLaXUXnfIX3V4ABAF6IjDtpXRN6AAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAWCAYAAAA8VJfMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDRDY5RDVDNjREMjA2ODExODA4M0Q4NDQ4QTQyQ0VFNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5RDBBRjUyREE4NkYxMUUzQTg2NkNDNkQ4NzU5MTdGQyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RDBBRjUyQ0E4NkYxMUUzQTg2NkNDNkQ4NzU5MTdGQyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzQzMzEzODMxMTIwNjgxMTgwODNFNkE2MzZGQkRDMjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0Q2OUQ1QzY0RDIwNjgxMTgwODNEODQ0OEE0MkNFRTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6cQKEAAAABPUlEQVR42uyUvUoDQRSF9/pH/GksgprawmibQgQrSZe3EMTCwjY+wNrZWVnY+AY2lhZCKhVB0UKw0kSw0mJBxfEbOSubdMrsBsSFjzuws5ydc+Zec85FRT8DUR+eoXRhZrkfGVetSzTVzlOzr/b+i/5t0ZOiRC2dSPRpAW2qPkWsTn2BJ7iHpIiJVBJlmIMHuM5T3B93DCZhBqaU8zucwWMe9vYGOQ7zMK2xdQV34UW33A31CPaj2C60YVZW+02nsjyoqMsM5D3YRDyRcFVWHwfI+FvU57cEu/AGa3DIj4xQb6Gjy1YNOxxia8EG60XZuAI7en8JH1CB0ZATqfZ1gWI7pzbgFdY57YIsbSvbir5pKoqf0iXqW2U5I+xzHYRV7emolv30gm2fzW/onb3DmdwOVOuqz6oToez9FGAACcCT2MSrVIQAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAWCAYAAAA8VJfMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDRDY5RDVDNjREMjA2ODExODA4M0Q4NDQ4QTQyQ0VFNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5RDExRkE0QUE4NkYxMUUzQTg2NkNDNkQ4NzU5MTdGQyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RDEwMEY4Q0E4NkYxMUUzQTg2NkNDNkQ4NzU5MTdGQyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzQzMzEzODMxMTIwNjgxMTgwODNFNkE2MzZGQkRDMjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0Q2OUQ1QzY0RDIwNjgxMTgwODNEODQ0OEE0MkNFRTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6CD8VKAAABPElEQVR42mL8//8/A70BE8MAABYYg5GRkeZeBoYqI4qlMLtpaeeABu+opcPb0iP0spQRViIB8ykdsikknzIyVP1/AqSvAvF+IF7G0Mb4iB6WIpdEf4F4FRBX0MByuKWgOFUE4hggXgO1NBKIrwAd40ufOK36rwJk9gKxHxD/A+JCoI8nUT94GRgcgfgVED8G4k9g6ar/5UCyDSofCbR4JbUtRQ7Gh9BE9RdocQWQbgfiL0CsTYU4RolTUP58AA1OeSA2A4u3MXYA6fVAzAO1nHpxisTmh1rIAXXEZaBvZYH0HSBmBmJloEMeUsunJkDMDcQfgfgUko95gZaA4nkt1NIwqOZKaN1IKkYpBiWB2BbJ4kfQEJCDpuz1ULXOID4Qt4NcTA5GL3tZgVgTyn4CpUWh9CUorUWtOAUIMABzFKcCCqRU8wAAAABJRU5ErkJggg=="
      ]
    };

    function bind(context, fn) {
      return function () {
        fn.apply(context, arguments);
      };
    }

    function ChromeCast(scope) {
      this.scope = scope;
      this.status = ChromeCast.Status.NOT_INITIALIZED;
      this.iconDisplay(false);
    }

    ChromeCast.prototype.parsePolicy = function () {
      var policy = chrome.cast.AutoJoinPolicy.PAGE_SCOPED;

      if (this.scope.policy) {
        switch (this.scope.policy.toUpperCase()) {
          case "NO_AUTO_JOIN": //no auto join
            policy = chrome.cast.AutoJoinPolicy.PAGE_SCOPED;
            break;
          case "APP_URL_TAB": //same appID, same URL, same tab
            policy = chrome.cast.AutoJoinPolicy.TAB_AND_ORIGIN_SCOPED;
            break;
          case "APP_URL": //same appID and same origin URL
            policy = chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED;
            break;
        }
      }

      return policy;
    }

    ChromeCast.prototype.initialize = function () {
      var sessionRequest = new chrome.cast.SessionRequest(this.scope.applicationId || chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID),
          apiConfig = new chrome.cast.ApiConfig(sessionRequest,
                                                bind(this, this.sessionListener),
                                                bind(this, this.receiverListener),
                                                this.parsePolicy());

      chrome.cast.initialize(apiConfig, bind(this, this.onInitSuccess), bind(this, this.onInitError));
      this.status = ChromeCast.Status.INITIALIZED;
    };

    ChromeCast.prototype.stop = function () {
      var that = this,
          scope = this.scope;
      if (scope && scope.session) {
        that.status = ChromeCast.Status.DISCONNECTING;
        scope.session.stop(function () {
          scope.$apply(function () {
            that.iconDisplay(false);
            scope.session = undefined;
          });
          that.status = ChromeCast.Status.NOT_CONNECTED;
        }, function () { /*ignored*/ });
      }
    };

    ChromeCast.prototype.sessionListener = function (session) {
      this.iconDisplay(true);
      this.scope.session = session;
      this.status = ChromeCast.Status.CONNECTED;
      session.addUpdateListener(bind(this, this.sessionActiveStatus));
    };

    ChromeCast.prototype.sessionActiveStatus = function (isAlive) {
      var that;
      if (!isAlive) {
        that = this;
        this.scope.$apply(function () {
          that.iconDisplay(false);
          that.status = ChromeCast.Status.NOT_CONNECTED;
        });
      }
    };

    ChromeCast.prototype.receiverListener = function (e) {
      if (e === chrome.cast.ReceiverAvailability.AVAILABLE) {
        this.iconAnimation(true);
        this.requestSession();
      } else {
        this.iconDisplay(false);
      }
    };

    ChromeCast.prototype.requestSession = function () {
      var that = this;
      chrome.cast.requestSession(function (session) {
        that.scope.$apply(function () {
          that.iconDisplay(true);
          that.scope.session = session;
        });

        that.status = ChromeCast.Status.CONNECTED;
        session.addUpdateListener(bind(that, that.sessionActiveStatus));
      }, function (e) {
        that.status = ChromeCast.Status.NOT_CONNECTED;
        that.iconDisplay(false);
      });
    };

    ChromeCast.prototype.onInitSuccess = function () {
      console.log("onInitSuccess");
    };

    ChromeCast.prototype.onInitError = function (e) {
      console.log("onInitError");
      console.log(e);
    };

    ChromeCast.prototype.iconAnimation = function (enable) {
      var scope;
      if (this.animationTimer && !enable) {
        $interval.cancel(this.animationTimer);
        this.animcationStart = null;
      } else if (enable) {
        if (this.animationTimer) {
          $interval.cancel(this.animationTimer);
        }
        scope = this.scope;
        this.animationTimer = $interval((function (index) {
          return function () {
            scope.icon = icon.animations[index % 3];
            index++;
          };
        })(0), 500);
      }
    };

    ChromeCast.prototype.iconDisplay = function (connected) {
      this.iconAnimation(false);
      if (connected) {
        this.scope.icon = icon.on;
        this.scope.alt = "Connected";
      } else {
        this.scope.icon = icon.off;
        this.scope.alt = "Not connected"
      }
    };

    ChromeCast.Status = {
      NOT_INITIALIZED:  "not initialized",
      INITIALIZED:      "initialized",
      NOT_CONNECTED:    "not connected",
      CONNECTING:       "connecting",
      CONNECTED:        "connected",
      DISCONNECTING:    "disconnecting"
    };

    return {
      restrict: "A",
      scope: {
        applicationId: "@",
        policy: "@"
      },
      template: '<img src="{{icon}}" alt="{{alt}}">',
      link: function (scope, element, attr) {
        var chromeCast;

        scope.icon = "";

        function chromeCastApp() {
          switch (chromeCast.status) {
            case ChromeCast.Status.NOT_INITIALIZED:
              chromeCast.iconAnimation(true);
              chromeCast.initialize();
              break;
            case ChromeCast.Status.NOT_CONNECTED:
              chromeCast.iconAnimation(true);
              chromeCast.requestSession();
              break;
            case ChromeCast.Status.CONNECTED:
              chromeCast.stop();
              break;
            default:
              /* do nothing */
          }
        }

        window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
          if (loaded) {
            chromeCast = new ChromeCast(scope);
            element.on('click', function () {
              chromeCastApp();
            });
            if (scope.policy === "APP_URL_TAB" || scope.policy === "APP_URL") {
              chromeCastApp();
            }
          } else {
            console.log(errorInfo);
          }
        };
      }
    };
  }])
  .directive("musicPlayer", [function () {
    return {
      restrict: "A",
      scope: { },
      template: '<img src="{{icon}}" alt="{{alt}}">',
      controller: [function () {

      }],
      link: function (scope) {

      }
    };
  }]);
