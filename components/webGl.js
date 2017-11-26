import { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import * as THREE from 'three'

//import WAGNER from '../bower_components/Wagner/Wagner'

export default class WebGl extends PureComponent {
  constructor(props) {
    super(props)
    this.resizeHandler = this.resizeHandler.bind(this)
    this.easeIn = this.easeIn.bind(this)
    this.easeOut = this.easeOut.bind(this)
  }

  componentDidMount() {
    if (typeof window === 'undefined')  {
      return
    }

    const container = ReactDOM.findDOMNode(this.refs.container)
    this.three = {}
    this.threshold = 48;
    this.size = {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight + this.threshold
    }

    this.three.scene = new THREE.Scene();
		this.three.camera = new THREE.PerspectiveCamera(75, this.size.innerWidth / this.size.innerHeight, 0.1, 5000);
		this.three.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.three.renderer.setPixelRatio( window.devicePixelRatio )
		this.three.renderer.setSize( this.size.innerWidth, this.size.innerHeight * 1.2)
    this.three.renderer.setClearColor( 0x282d47, 1 )
    // add the container
    container.appendChild( this.three.renderer.domElement )

    this.three.camera.position.z = 6250
    this.three.scene.fog = new THREE.Fog( 0x282d47, 1000, 6250 )

    /*
    * Star
    **/
    const star = {}
		star.geometry = new THREE.SphereGeometry(2, 32, 32)
		star.material = new THREE.MeshBasicMaterial(
      {
        color: 0xe0e0e0
      }
    )

    /*
    * AP logo
    **/
    this.apLogoCoposent = {}

    //this.apLogoCoposent.image = new THREE.TextureLoader().load("static/textures/logo-another-planet-white.png" );

    this.apLogoCoposent.geometry = new THREE.PlaneGeometry(512, 512)
    this.apLogoCoposent.material = new THREE.MeshBasicMaterial( {
      // color: 0xffffff,
      // side: THREE.DoubleSide,
      transparent: true
    } );
    this.aplogo = new THREE.Mesh( this.apLogoCoposent.geometry, this.apLogoCoposent.material )
    this.aplogo.position.x = 0;

    var loader = new THREE.TextureLoader()
    // load a resource
    loader.load(
    	// resource URL
    	'static/textures/logo-another-planet-white.png', // 'static/textures/uv.jpg',
    	// Function when resource is loaded
    	(texture) => {
    		this.apLogoCoposent.material.map = texture
        this.three.scene.add( this.aplogo )
        this.three.renderer.render(this.three.scene, this.three.camera)
    	}
    )
    this.three.stars = []
    for (var z = -1200; z < 6000; z += 15 ) {
			// Make a sphere (exactly the same as before).
			const sphere = new THREE.Mesh(star.geometry, star.material)
			// This time we give the sphere random x and y positions between -500 and 500
			sphere.position.x = Math.random() * 2000 - 1000;
			sphere.position.y = Math.random() * 5000 - 2500;
			// Then set the z position to where it is in the loop (distance of camera)
			sphere.position.z = z;
			// scale it up a bit
			sphere.scale.x = sphere.scale.y = Math.random() * 4;
			//add the sphere to the scene
			this.three.scene.add( sphere );
			//finally push it to the stars array
			this.three.stars.push(sphere);
		}
    this.three.camera.position.z = 6250
    this.aplogo.position.y = 100
    this.aplogo.position.z = 4500
    this.aplogo.position.x = 0
    //this.aplogo.rotation.y = 0.5
    this.three.camera.position.y = 0
    /*
    * Resize listner
    **/
    window.addEventListener('resize', this.resizeHandler, false)
    this.resizeHandler()
  }

  componentWillUnmount() {
    if (typeof window === 'undefined')  {
      return
    }
    window.removeEventListener('resize', this.resizeHandler, false)
  }

  // TODO move in animation class
  easeIn(t, d, pow) {
    return Math.pow(Math.min(t, d) / d, pow);
  }

  // TODO move in animation class
  easeOut(t, d, pow) {
    return 1 - Math.pow(1 - (Math.min(t, d) / d), pow)
  }

  componentDidUpdate(prevProps) {
    if (typeof window === 'undefined')  {
      return
    }
		//this.three.camera.lookAt( this.three.scene.position );
    if (prevProps.timecontrol !== this.props.timecontrol) {
      const zpos = this.easeOut(this.props.timecontrol, 2000, 3)
      this.three.camera.position.z = zpos * -5000 + 6250
      this.aplogo.position.y = zpos * -400 + 100
      this.aplogo.position.z = zpos * -4500 + 4500
      this.apLogoCoposent.material.opacity = 1 - zpos //or any other value you like
      //this.aplogo.rotation.y = (zpos * -0.5) + 0.5
      this.three.camera.position.y = this.props.timecontrol * -0.5
      this.three.renderer.render(this.three.scene, this.three.camera)
    }
  }

  resizeHandler() {
    //var style = window.getComputedStyle(ReactDOM.findDOMNode(this.refs.container), null)
    //console.log(window.innerHeight, style.getPropertyValue("height"))
    if( Math.abs(this.size.innerWidth - window.innerWidth) > this.threshold || Math.abs(this.size.innerHeight - window.innerHeight) > this.threshold) {
      this.size = {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
      }
    }
    this.three.camera.aspect = this.size.innerWidth / this.size.innerHeight;
    this.three.camera.updateProjectionMatrix();
    this.three.renderer.setSize( this.size.innerWidth, this.size.innerHeight );
    this.three.windowHalfX = this.size.innerWidth / 2;
    this.three.windowHalfY = this.size.innerHeight / 2;
    setTimeout(this.three.renderer.render( this.three.scene, this.three.camera),100)
  }

  render() {
    const { className, timecontrol, ...props } = this.props;
    const classNames = ['heroCanvasContainer', className].join(' ');
    return (
      <div ref="container" className={`${classNames}`} {...props}>
      <style jsx>{`

          .heroCanvasContainer {
            position: fixed;
            width: 100%;
            height: 100vh;
            top: 0;
            left: 0;
            z-index: -2;
          }

          .heroCanvasContainer :global(canvas) {
            width: 100%;
            height: 100%
          }

      `}</style>
    </div>
    );
  }
}
