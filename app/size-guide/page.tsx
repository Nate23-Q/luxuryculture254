export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-primary section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-lg mb-8">Size Guide</h1>
          
          <div className="space-y-8">
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4">Men's Footwear</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">US</th>
                      <th className="text-left p-2">UK</th>
                      <th className="text-left p-2">EU</th>
                      <th className="text-left p-2">CM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="p-2">7</td><td className="p-2">6</td><td className="p-2">40</td><td className="p-2">25</td></tr>
                    <tr className="border-b"><td className="p-2">8</td><td className="p-2">7</td><td className="p-2">41</td><td className="p-2">26</td></tr>
                    <tr className="border-b"><td className="p-2">9</td><td className="p-2">8</td><td className="p-2">42</td><td className="p-2">27</td></tr>
                    <tr className="border-b"><td className="p-2">10</td><td className="p-2">9</td><td className="p-2">43</td><td className="p-2">28</td></tr>
                    <tr className="border-b"><td className="p-2">11</td><td className="p-2">10</td><td className="p-2">44</td><td className="p-2">29</td></tr>
                    <tr className="border-b"><td className="p-2">12</td><td className="p-2">11</td><td className="p-2">45</td><td className="p-2">30</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4">How to Measure</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Place your foot on a piece of paper</li>
                <li>Mark the longest toe and back of heel</li>
                <li>Measure the distance in centimeters</li>
                <li>Use the chart above to find your size</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}