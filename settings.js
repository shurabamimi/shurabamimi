pluginManagement {
    repositories {
        mavenLocal()
        gradlePluginPortal()
    }
}

include ":api"
include ":api-test-util"
include ":app"
include ":app:test_plugins"
include "example-plugins"
include "example-plugins:custom-data-and-widget"
include "example-plugins:custom-theme"
include "integ_test"
include ":plugins:base"
include ":plugins:cameraserver"
include ":plugins:networktables"
include ":plugins:powerup"

rootProject.children.each {
    setUpChildProject(it)
}

private void setUpChildProject(ProjectDescriptor project) {
    /*
     * Instead of every file being named build.gradle.kts we instead use the name ${project.name}.gradle.kts.
     * This is much nicer for searching for the file in your IDE.
     */
    final String groovyName = "${project.name}.gradle"
    final String kotlinName = "${project.name}.gradle.kts"
    project.buildFileName = groovyName
    if (!project.buildFile.isFile()) {
        project.buildFileName = kotlinName
    }
    assert project.buildFile.isFile(): "File named $groovyName or $kotlinName must exist."
    project.children.each { setUpChildProject(it) }
}
