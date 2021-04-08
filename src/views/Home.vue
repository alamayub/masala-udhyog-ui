<template>
  <div class="Home">
    <Navbar />
    <Sidebar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
export default {
  components: {
    Navbar, Sidebar, Footer
  },
}
</script>