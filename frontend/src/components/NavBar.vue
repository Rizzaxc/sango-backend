<template>
    <nav class="navbar is-success" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item">
                SANGO
            </a>
        </div>

        <div class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item" href="/">
                    <strong>Kanji</strong>
                </a>
                <a class="navbar-item">
                    <strong>WaniKani Level Overview</strong>
                </a>
            </div>

            <div class="navbar-end">
                <a class="navbar-item">
                    About
                </a>
            </div>
        </div>
    </nav>
</template>


<script>
    export default {
        name: 'NavBar',
        props: {}
    }
</script>