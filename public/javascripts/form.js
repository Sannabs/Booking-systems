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
  } else {
    alert('Form submitted!');
  }
});

updateForm();