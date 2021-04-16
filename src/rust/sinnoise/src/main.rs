extern crate image;
extern crate num_complex;

fn main() {
    let k = 0.1f32;
    let ix = 500;
    let iy = 500;
    let mut imgbuf = image::ImageBuffer::new(ix, iy);

    for (x, y, pixel) in imgbuf.enumerate_pixels_mut() {
	let c1 = 255f32 * (f32::sin((k*x as f32))+1f32)/4f32;
	let c2 = 255f32 * (f32::sin((k*y as f32))+1f32)/4f32;
	let cc = (c1 + c2) as u8;
	*pixel = image::Rgb([cc, cc, cc]);
    }

    imgbuf.save("noise_sin.png").unwrap();
}
