/**
* Template Name: Arsha - v4.7.1
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate  glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  $(document).ready(function () {
    // $('#barangKapal1').select2() // init select2
    $('#barangKapal2').select2() // init select2
    $('#barangPesawat').select2() // init select2
  })

  $('button[data-bs-toggle="pill"]').on('shown.bs.tab', function (e) {
    changeSelect()
  })

  function changeSelect() {
    $("select.select2").select2({
      tags: true
    })
  }

  function rupiah(bilangan) {
    let reverse = bilangan.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g)

    ribuan = ribuan.join('.').split('').reverse().join('')

    return ribuan
  }

  // $('#barangKapal1').on('select2:select', function (e) {
  //   let barang = rupiah($('#barangKapal1').val())
  //   $('#priceKapal1').text('Harga Rp ' + barang + '/CBM').show()
  // })

  $('#barangKapal2').on('select2:select', function (e) {
    let barang = rupiah($('#barangKapal2').val())
    $('#priceKapal2').text('Harga Rp ' + barang + '/CBM').show()
  })

  $('#barangPesawat').on('select2:select', function (e) {
    let barang = $('#barangPesawat').val().split('|')
    $('#pricePesawat').text('Harga Rp ' + rupiah(barang[0]) + '/kg ke Jakarta. Jika kota lain, maka terdapat biaya lain').show()
  })

  // $('#calculateKapal1').on('click', () => {
  //   if ($('#calculateKapal1').data('clicked') == "true"){
  //     $('#calculateKapal1').html('<b>Hitung Biaya</b>').data('clicked', "false")
  //     $('#total-harga-kapal1').text('')
  //     $('#volumeKapal1').val('')
  //     $('#harga-per-cbm-kapal1').val('')
  //     $('#calculateResultKapal1').hide()
  //   } else {
  //     $('#kapal1-form').validate({
  //       rules: {
  //         barangKapal: {
  //           required: true
  //         },
  //         panjang: {
  //           required: true
  //         },
  //         lebar: {
  //           required: true
  //         },
  //         tinggi: {
  //           required: true
  //         },
  //       },
  //     })

  //     if ($('#kapal1-form').valid()){
  //       let panjang = $('#panjangKapal1').val()
  //       let lebar = $('#lebarKapal1').val()
  //       let tinggi = $('#tinggiKapal1').val()

  //       let volume = panjang * lebar * tinggi / 1000000
  //       let cbm = parseInt($('#barangKapal1').val())
  //       if (volume < 0.1 || volume > 1)
  //         cbm += 500000

  //       let harga = cbm * volume
  //       let formatterIDR = new Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR" })
  //       harga = formatterIDR.format(harga)
  //       cbm = formatterIDR.format(cbm)

  //       $('#total-harga-kapal1').text(harga)
  //       $('#volumeKapal1').val(volume + " m³")
  //       $('#harga-per-cbm-kapal1').val(cbm + '/CBM')

  //       $('#calculate-kapal1').html('<b>Hitung Ulang</b>').data('clicked', "true")
  //       $('#calculateResultKapal1').show()
  //     }
  //   }
  // })

  $('#calculateKapal2').on('click', () => {
    if ($('#calculateKapal2').data('clicked') == "true") {
      $('#calculateKapal2').html('<b>Hitung Biaya</b>').data('clicked', "false")
      $('#total-harga-kapal2').text('')
      $('#volumeKapal2').val('')
      $('#harga-per-cbm-kapal2').val('')
      $('#calculateResultKapal2').hide()
    } else {
      $('#kapal2-form').validate({
        rules: {
          barangKapal: {
            required: true
          },
          panjang: {
            required: true
          },
          lebar: {
            required: true
          },
          tinggi: {
            required: true
          },
        },
      })

      if ($('#kapal2-form').valid()) {
        let panjang = $('#panjangKapal2').val()
        let lebar = $('#lebarKapal2').val()
        let tinggi = $('#tinggiKapal2').val()

        let volume = panjang * lebar * tinggi / 1000000
        let cbm = parseInt($('#barangKapal2').val())

        let harga
        if (volume < 0.1)
          harga = cbm * 0.1
        else
          harga = cbm * volume
        let formatterIDR = new Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR" })
        harga = formatterIDR.format(harga)
        cbm = formatterIDR.format(cbm)

        $('#total-harga-kapal2').text(harga)
        $('#volumeKapal2').val(volume + " m³")
        $('#harga-per-cbm-kapal2').val(cbm + '/CBM')

        $('#calculate-kapal2').html('<b>Hitung Ulang</b>').data('clicked', "true")
        $('#calculateResultKapal2').show()
      }
    }
  })

  function roundHalf(num) {
    let decimal = num % 1 // find decimal
    if (decimal < 0.5) decimal = 0.5
    else decimal = 1

    return Math.floor(num) + decimal
  }

  $('#calculatePesawat').on('click', () => {
    if ($('#calculatePesawat').data('clicked') == "true") {
      $('#calculatePesawat').html('<b>Hitung Biaya</b>').data('clicked', "false")
      $('#total-harga-pesawat').text('')
      $('#volumePesawat').val('')
      $('#harga-per-cbm-pesawat').val('')
      $('#calculateResultPesawat').hide()
    } else {
      $('#pesawat-form').validate({
        rules: {
          barangPesawat: {
            required: true
          },
          panjangPesawat: {
            required: true
          },
          lebarPesawat: {
            required: true
          },
          tinggiPesawat: {
            required: true
          },
          beratAktual: {
            required: true
          },
        },
      })

      if ($('#pesawat-form').valid()) {
        let panjang = $('#panjangPesawat').val()
        let lebar = $('#lebarPesawat').val()
        let tinggi = $('#tinggiPesawat').val()

        let volumeWeight = parseFloat((panjang * lebar * tinggi / 6000).toFixed(2))

        let beratAktual = parseFloat($('#beratAktual').val())
        let harga = 0
        let weight = 0
        if (beratAktual > volumeWeight) {
          $('#dihitung').val('Berat Aktual')
          weight = beratAktual
        } else {
          $('#dihitung').val('Berat Volume')
          weight = volumeWeight
        }

        let failed = false
        let message = ""
        let barang = $('#barangPesawat').val().split('|')
        if (barang[1] == 'umum' || barang[1] == 'gadget') {
          if (weight >= 0.5) {
            harga = weight * parseInt(barang[0])
          } else {
            message = 'Berat minimal 500 gram'
            failed = true
          }
        }

        if (barang[1] == 'branded') {
          if (weight >= 1) {
            if (weight < 10) {
              harga = roundHalf(weight) * parseInt(barang[0])
              $('#dihitung').val($('#dihitung').val() + ` (${roundHalf(weight)} kg)`)
            } else {
              harga = weight * parseInt(barang[0])
              $('#dihitung').val($('#dihitung').val() + ` (${weight} kg)`)
            }
          } else {
            message = 'Berat minimal 1 kilogram'
            failed = true
          }
        }

        $('#volumePesawat').val(volumeWeight + " kg")
        if (failed) {
          $('#total-harga-pesawat').text('Rp -')
          $('#errorPesawat').children().text(message)
          $('#errorPesawat').show()
        } else {
          let formatterIDR = new Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR" })
          harga = formatterIDR.format(harga)

          $('#total-harga-pesawat').text(harga)
        }
        $('#calculatePesawat').html('<b>Hitung Ulang</b>').data('clicked', "true")
        $('#calculateResultPesawat').show()
      }
    }
  })

  // gallery carousel
  $('.gallery-carousel').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 4000,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  })

  // fullscreen image clicked
  $('img[data-enlargeable]').addClass('img-enlargeable').click(function () {
    var src = $(this).attr('src');
    var modal;

    function removeModal() {
      modal.remove();
      $('body').off('keyup.modal-close');
    }
    modal = $('<div>').css({
      background: 'RGBA(0,0,0,.7) url(' + src + ') no-repeat center',
      backgroundSize: 'contain',
      backgroundOrigin: 'content-box',
      padding: '4rem',
      width: '100%',
      height: '100%',
      position: 'fixed',
      zIndex: '10000',
      top: '0',
      left: '0',
      cursor: 'zoom-out'
    }).click(function () {
      removeModal();
    }).appendTo('body');
    //handling ESC
    $('body').on('keyup.modal-close', function (e) {
      if (e.key === 'Escape') {
        removeModal();
      }
    });
  });

  $("#name").on("input", function () {
    $("#submitter_name").text(', ' + $(this).val());
  });

  // $('#todo-save-btn').on('click', function () {
  //   localStorage.setItem("name", "Jack Sparrow");
  // })

  document.addEventListener("DOMContentLoaded", () => {
    // Initialize an empty array to store elements
    let todosArr = [];

    // Function to display the current array
    function displayArray() {
      // remove 3 char notes or below
      todosArr = todosArr.filter((todo) => {
        return todo.length > 3
      })

      const arrayList = document.getElementById('todo-list');
      arrayList.innerHTML = '';

      todosArr.forEach((item, index) => {
        const listItem = `<div class="col-lg-6 my-3 todo-notes" data-aos="zoom-in" data-aos-delay="300">
                            <div class="card shadow" data-index="${index}">
                                <div class="card-body justify-content-center text-center">
                                    <h4 class="my-3">${item}</h4>
                                </div>
                            </div>
                        </div>`;
        arrayList.innerHTML += listItem;
      });
    }

    // Function to save the array to local storage
    on('click', '#todo-save-btn', function (e) {
      const inputElement = document.getElementById('todo-input');
      const newItem = inputElement.value;

      // Add the item to the array
      todosArr.push(newItem);

      // Clear the input field
      inputElement.value = '';

      // Update the displayed array
      displayArray();

      // Convert the array to a JSON string
      const arrayJson = JSON.stringify(todosArr);

      // Store the JSON string in local storage
      localStorage.setItem('todosArr', arrayJson);

      alert('Your todo is already saved!');
    })

    $('.todo-notes').on('click', function () {
      Swal.fire({
        title: 'Apakah ingin menghapus note berikut?',
        showDenyButton: true,
        confirmButtonText: 'Hapus',
        denyButtonText: `Tidak`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          todosArr.splice($(this).data('index'), 1)

          // Update the displayed array
          displayArray();

          // Convert the array to a JSON string
          const arrayJson = JSON.stringify(todosArr);

          // Store the JSON string in local storage
          localStorage.setItem('todosArr', arrayJson);

          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Oke!', '', 'info')
        }

        return
      })
    })

    // On page load, check if the array is in local storage and load it if available
    window.onload = function () {
      if (document.getElementById('todos-main') !== null) {
        var storedArray = localStorage.getItem('todosArr');
        if (storedArray) {
          todosArr = JSON.parse(storedArray);
          displayArray();
        }
      }

      $('.todo-notes').on('click', function () {
        Swal.fire({
          title: 'Apakah ingin menghapus note berikut?',
          showDenyButton: true,
          confirmButtonText: 'Hapus',
          denyButtonText: `Tidak`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            todosArr.splice($(this).data('index'), 1)

            // Update the displayed array
            displayArray();

            // Convert the array to a JSON string
            const arrayJson = JSON.stringify(todosArr);

            // Store the JSON string in local storage
            localStorage.setItem('todosArr', arrayJson);

            Swal.fire('Saved!', '', 'success').then(() => location.reload())
          } else if (result.isDenied) {
            Swal.fire('Oke!', '', 'info')
          }

          return
        })
      })
    };
  });

  $('#form-order-now').on('submit', function (e) {
    e.preventDefault();

    let formFilled = true;
    $('#form-order-now input').each(function () {
      if ($(this).val() === '') {
        formFilled = false;
        return false; // exit the loop early if any input is empty
      }

      if ($(this).attr('type') === 'email') {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test($(this).val())) {
          formFilled = false;
          return false; // exit the loop early if an email input is invalid
        }
      }
    });

    if (!formFilled) {
      return
    }

    $('#form-order-now input').each(function () {
      $(this).val('')
    });

    $('#form-order-now textarea').val('')

    Swal.fire(
      'Thank you!',
      'Your data will be processed!',
      'success'
    )
  })
})()