const inputs = document.querySelectorAll('.select-number input[type="number"]');

inputs.forEach(input => {
  input.addEventListener('wheel', function (e) {
    e.preventDefault();           // chặn scroll trang
    const delta = Math.sign(e.deltaY); // +1 hoặc -1
    const min = parseInt(this.min) || 0;
    this.value = Math.max(min, parseInt(this.value) - delta);
  });
});