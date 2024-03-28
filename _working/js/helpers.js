class Helpers{
    /**
	 * 
	 * @param {number} x1 
	 * @param {number} y1 
	 * @param {number} x2 
	 * @param {number} y2 
	 * @returns number
	 */
	static GetDist(x1,y1,x2,y2) {
    	return Math.hypot(x2-x1, y2-y1);
  	}
}