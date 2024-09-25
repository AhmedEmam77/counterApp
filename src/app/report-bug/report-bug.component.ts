import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import Cropper from 'cropperjs';
import html2canvas from 'html2canvas';

// Bug Report Interface
interface BugReport {
  title: string;
  description: string;
  stepsToReproduce: string;
  priority: string;
  category: string;
  screenshots: string[];
}

@Component({
  selector: 'app-report-bug',
  templateUrl: './report-bug.component.html',
  styleUrls: ['./report-bug.component.css'],
})
export class ReportBugComponent implements OnInit, AfterViewInit {
  isDialogOpen = false;
  isScreenshotDialogOpen = false;
  screenshots: string[] = []; // Array to store multiple screenshots
  currentScreenshot: string | null = null; // Holds the screenshot in the modal for editing
  screenshotIndexToReplace: number | null = null; // To track which screenshot to replace

  // Form Data (Binded with ngModel)
  newBugReport: BugReport = {
    title: '',
    description: '',
    stepsToReproduce: '',
    priority: '',
    category: '',
    screenshots: [],
  };

  // Array to hold all submitted bug reports
  bugReports: BugReport[] = [];

  @ViewChild('screenshotImage', { static: false }) screenshotImage!: ElementRef;
  cropper: Cropper | null = null;

  // Feedback message
  submissionSuccess: boolean = false;

  // Device Information
  browserInfo: string = '';
  osInfo: string = '';
  deviceInfo: string = '';

  ngOnInit() {
    this.getDeviceInfo();
  }

  ngAfterViewInit() {
    const expandingInputs = document.querySelectorAll(
      'textarea.expanding-input'
    );
    expandingInputs.forEach((input: any) => {
      input.addEventListener('input', () => {
        input.style.height = 'auto'; // Reset height
        input.style.height = input.scrollHeight + 'px'; // Set height to scroll height
      });
    });
  }

  // Function to get browser, OS, and device information
  getDeviceInfo() {
    const userAgent = navigator.userAgent;

    // Browser info
    const browserMatch = userAgent.match(
      /(firefox|msie|trident|chrome|safari|opera)/i
    );
    this.browserInfo = browserMatch ? browserMatch[0] : 'Unknown';

    // OS info
    const osMatch = userAgent.match(
      /(windows|macintosh|linux|android|iphone|ipad)/i
    );
    this.osInfo = osMatch ? osMatch[0] : 'Unknown';

    // Device info
    this.deviceInfo = /mobile|android|iphone|ipad/i.test(userAgent)
      ? 'Mobile Device'
      : 'Desktop Device';
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  openScreenshotDialog() {
    this.isScreenshotDialogOpen = true;
  }

  closeScreenshotDialog() {
    this.isScreenshotDialogOpen = false;
  }

  // Take screenshot of the entire page
  takeScreenshot() {
    // Close the dialog before taking a screenshot
    this.isDialogOpen = false;

    // Give a slight delay to ensure the dialog is fully closed before capturing the screenshot
    setTimeout(() => {
      const bodyElement = document.body;

      html2canvas(bodyElement)
        .then((canvas) => {
          this.currentScreenshot = canvas.toDataURL('image/png'); // Save the screenshot to be displayed in the screenshot dialog
          this.openScreenshotDialog(); // Open screenshot dialog with the captured image
          setTimeout(() => {
            this.initializeCropper(); // Initialize cropper after screenshot loads
          }, 100);
        })
        .catch((error) => {
          console.error('Error taking screenshot:', error);
        });
    }, 500); // Delay to allow dialog to close
  }

  // Initialize cropper on the screenshot image
  initializeCropper() {
    const imageElement = this.screenshotImage.nativeElement as HTMLImageElement;
    if (imageElement) {
      this.cropper = new Cropper(imageElement, {
        aspectRatio: NaN, // Allow freeform cropping
        viewMode: 1,
        autoCropArea: 1,
      });
    }
  }

  // Submit the cropped screenshot and reset for the next screenshot
  submitScreenshot() {
    if (this.cropper) {
      const croppedCanvas = this.cropper.getCroppedCanvas();
      const screenshot = croppedCanvas.toDataURL('image/png');

      if (this.screenshotIndexToReplace !== null) {
        // Replace the screenshot at the specific index
        this.screenshots[this.screenshotIndexToReplace] = screenshot;
        this.screenshotIndexToReplace = null; // Reset the index to replace
      } else {
        this.screenshots.push(screenshot); // Add the cropped screenshot to the array
      }
    }
    this.resetScreenshotDialog(); // Reset the screenshot dialog for the next screenshot
    this.isDialogOpen = true; // Re-open the bug report dialog
  }

  // Retake screenshot (replace an existing screenshot)
  retakeScreenshotAtIndex(index: number) {
    this.screenshotIndexToReplace = index; // Track which screenshot to replace
    this.takeScreenshot(); // Start the process to take a new screenshot
  }

  // Retake screenshot (for the current modal)
  retakeScreenshot() {
    this.currentScreenshot = null;
    this.cropper?.destroy(); // Remove the current cropper
    this.takeScreenshot();
  }

  // Delete a screenshot
  deleteScreenshot(index: number) {
    this.screenshots.splice(index, 1); // Remove screenshot by index
  }

  // Open screenshot in fullscreen
  viewScreenshot(screenshot: string) {
    const newWindow = window.open();
    newWindow?.document.write(`<img src="${screenshot}" style="width:100%"/>`);
  }

  // Reset the screenshot dialog after submission or cancel
  resetScreenshotDialog() {
    this.currentScreenshot = null;
    this.cropper?.destroy(); // Remove the cropper instance
    this.closeScreenshotDialog(); // Close the screenshot dialog
  }

  // Submit Bug Report
  submitBugReport(form: any) {
    // Validate the form before submission
    if (
      !this.newBugReport.title.trim() ||
      !this.newBugReport.description.trim() ||
      !this.newBugReport.stepsToReproduce.trim() ||
      !this.newBugReport.priority ||
      !this.newBugReport.category
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    // Add the current screenshots to the bug report
    this.newBugReport.screenshots = [...this.screenshots];

    // Add the new bug report to the list
    this.bugReports.push({ ...this.newBugReport });

    // Reset the form and clear screenshots for new submission
    this.newBugReport = {
      title: '',
      description: '',
      stepsToReproduce: '',
      priority: '',
      category: '',
      screenshots: [],
    };
    this.screenshots = [];

    // Reset the form controls
    form.resetForm({
      priority: '',
      category: '',
    });

    // Provide feedback to the user
    this.submissionSuccess = true;
    setTimeout(() => {
      this.submissionSuccess = false;
    }, 3000); // Hide the message after 3 seconds

    this.closeDialog();
  }

  // Optional: Close success message when clicking outside or on escape
  @HostListener('document:keydown.escape', ['$event'])
  onEscPress(event: KeyboardEvent) {
    if (this.isDialogOpen) {
      this.closeDialog();
    }
    if (this.isScreenshotDialogOpen) {
      this.closeScreenshotDialog();
    }
  }
}
