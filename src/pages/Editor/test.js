if (this.props.modelName != "") {
    var teapotSize = 400;
          var tess = - 1;	// force initialization
          var bBottom;
          var bLid;
          var bBody;
          var bFitLid;
          var bNonBlinn;
          var shading;
          var wireMaterial, flatMaterial, gouraudMaterial, phongMaterial, texturedMaterial, reflectiveMaterial;

          var teapot, textureCube;
    // TEXTURE MAP
    var textureMap = new THREE.TextureLoader().load('/textures/uv_grid_opengl.jpg');
    textureMap.wrapS = textureMap.wrapT = THREE.RepeatWrapping;
    textureMap.anisotropy = 16;
    textureMap.encoding = THREE.sRGBEncoding;

    // REFLECTION MAP
    var path = "/textures/cube/pisa/";
    var urls = [
      path + "px.png", path + "nx.png",
      path + "py.png", path + "ny.png",
      path + "pz.png", path + "nz.png"
    ];

    textureCube = new THREE.CubeTextureLoader().load(urls);
    textureCube.encoding = THREE.sRGBEncoding;

    // MATERIALS
    var materialColor = new THREE.Color();
    materialColor.setRGB(1.0, 1.0, 1.0);

    wireMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });

    flatMaterial = new THREE.MeshPhongMaterial({ color: materialColor, specular: 0x000000, flatShading: true, side: THREE.DoubleSide });

    gouraudMaterial = new THREE.MeshLambertMaterial({ color: materialColor, side: THREE.DoubleSide });

    phongMaterial = new THREE.MeshPhongMaterial({ color: materialColor, side: THREE.DoubleSide });

    texturedMaterial = new THREE.MeshPhongMaterial({ color: materialColor, map: textureMap, side: THREE.DoubleSide });

    reflectiveMaterial = new THREE.MeshPhongMaterial({ color: materialColor, envMap: textureCube, side: THREE.DoubleSide });

    if (teapot !== undefined) {

      teapot.geometry.dispose();
      scene.remove(teapot);

    }

    var teapotGeometry = new TeapotBufferGeometry(teapotSize,
      tess,
      effectController.bottom,
      effectController.lid,
      effectController.body,
      effectController.fitLid,
      !effectController.nonblinn);

    teapot = new THREE.Mesh(
      teapotGeometry,
      shading === "wireframe" ? wireMaterial : (
        shading === "flat" ? flatMaterial : (
          shading === "smooth" ? gouraudMaterial : (
            shading === "glossy" ? phongMaterial : (
              shading === "textured" ? texturedMaterial : reflectiveMaterial)))));	// if no match, pick Phong

    scene.add(teapot);

  }