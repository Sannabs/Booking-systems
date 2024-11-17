const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let currentStep = 1;

const steps = document.querySelectorAll('.step-form');
const progressCircles = document.querySelectorAll('.w-8');

const updateForm = () => {
  steps.forEach((step, index) => {
    if (index + 1 === currentStep) {
      step.classList.remove('hidden');
    } else {
      step.classList.add('hidden');
    }
  });

  if (currentStep === 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  if (currentStep === steps.length) {
    nextBtn.textContent = 'Submit';
  } else {
    nextBtn.textContent = 'Next';
  }

  progressCircles.forEach((circle, index) => {
    if (index + 1 <= currentStep) {
      circle.classList.remove('bg-gray-300', 'text-gray-600');
      circle.classList.add('bg-indigo-500', 'text-white');
    } else {
      circle.classList.remove('bg-indigo-500', 'text-white');
      circle.classList.add('bg-gray-300', 'text-gray-600');
    }
  });
  
};

prevBtn.addEventListener('click', () => {
  if (currentStep > 1) {
    currentStep--;
    updateForm();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentStep < steps.length) {
    currentStep++;
    updateForm();
  } 
});

updateForm();

document.addEventListener("DOMContentLoaded", function () {
  const serviceRadios = document.querySelectorAll('input[name="service"]');
  const digitalServicesSection = document.getElementById("digitalServicesSection");
  const itServicesSection = document.getElementById("itServicesSection");
  const engineeringServicesSection = document.getElementById("engineeringServicesSection");

  serviceRadios.forEach(radio => {
      radio.addEventListener("change", function () {
          // Hide all sections first
          digitalServicesSection.classList.add("hidden");
          itServicesSection.classList.add("hidden");
          engineeringServicesSection.classList.add("hidden");

          // Show relevant section based on selected service
          if (this.value === "Digital Solutions") {
              digitalServicesSection.classList.remove("hidden");
          } else if (this.value === "Information Technology") {
              itServicesSection.classList.remove("hidden");
          } else if (this.value === "Blockchain & Engineering") {
              engineeringServicesSection.classList.remove("hidden");
          }
      });
  });
});
